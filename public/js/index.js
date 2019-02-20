const socket = io();

socket.on("connect", function() {
	console.log("Connected to server");
});
socket.on("disconnect", function() {
	console.log("Disconnected from server");
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