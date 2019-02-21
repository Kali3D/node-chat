const socket = io();

function scrollToBottom() {
	//sselectors
	const messages = $("#messages");
	const newMessage = messages.children("li:last-child");
	//heights
	const clientHeight = messages.prop("clientHeight");
	const scrollTop = messages.prop("scrollTop");
	const scrollHeight = messages.prop("scrollHeight");
	const newMessageHeight = newMessage.innerHeight();
	const lastMessageHeight = newMessage.prev().innerHeight();
	if (clientHeight+scrollTop+newMessageHeight+lastMessageHeight >= scrollHeight) {
		messages.scrollTop(scrollHeight);
	}
};


socket.on("connect", function() {
	console.log("Connected to server");
	const urlParams = new URLSearchParams(location.search);
	const params = {};
	for (let param of urlParams)
		params[param[0]] = param[1].trim();
	socket.emit("join", params, function(error) {
		if (error) {
			alert(error);
			location.href = "/";
		} else
			console.log("no error");
	});
});
socket.on("disconnect", function() {
	console.log("Disconnected from server");
});

socket.on("updateUserList", function(users) {
	const ol = $("<ol></ol>");
	for (let user of users)
		ol.append(`<li>${user}</li>`);
	$("#users").html(ol);
});

socket.on("newMessage", function(message) {
	const time = moment(message.createdAt).format("h:mm a");
	const template = $("#messageTemplate").html();
	const html = Mustache.render(template, {
		text: message.text,
		from: message.from,
		createdAt: time
	});
	$("#messages").append(html);
	scrollToBottom();
});

socket.on("newLocationMessage", function(message) {
	const time = moment(message.createdAt).format("h:mm a");
	const template = $("#locationTemplate").html();
	const html = Mustache.render(template, {
		from: message.from,
		url: message.url,
		createdAt: time
	});
	$("#messages").append(html);
	scrollToBottom();
});

$("#messageForm").on("submit", function(event){
	event.preventDefault();
	const messageInput = $("#message")
	socket.emit("createMessage", {
		from: "Nico",
		text: messageInput.val()
	}, function() {
		messageInput.val("");
		messageInput.focus();
	});
});

const locationButton = $("#location");
locationButton.on("click", function(event) {
	event.preventDefault();
	if (!navigator.geolocation)
		return alert("Geolocalisation non disponible");
	locationButton.attr("disabled", "disabled").html("Envoi en cours ...");
	navigator.geolocation.getCurrentPosition(function(position) {
		socket.emit("createLocationMessage", {
			latitude: position.coords.latitude,
			longitude: position.coords.longitude
		});
		locationButton.removeAttr("disabled").html("Envoyer la localisation");
	}, function() {
		locationButton.removeAttr("disabled").html("Envoyer la localisation");
		alert("Impossible de recuperer la localisation");
	});
});