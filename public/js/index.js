const socket = io();

socket.on("connect", function() {
	console.log("Connected to server");
});
socket.on("disconnect", function() {
	console.log("Disconnected from server");
});
socket.on("newMessage", function(message) {
	const li = $("<li></li>").html(`${message.from}: ${message.text}`);
	$("#messages").append(li);
});

socket.on("newLocationMessage", function(message) {
	const li = $("<li></li>").html(`${message.from}: <a target='_blank' href='${message.url}'>Current location</a>`);
	$("#messages").append(li);
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