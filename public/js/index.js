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
	socket.emit("createMessage", {
		from: "Nico",
		text: $("#message").val()
	}, function(data) {
		console.log("got it ! : ", data);
	});
});

const locationButton = $("#location");
locationButton.on("click", function(event) {
	event.preventDefault();
	if (!navigator.geolocation)
		return alert("Geolocalisation non disponible");
	navigator.geolocation.getCurrentPosition(function(position) {
		socket.emit("createLocationMessage", {
			latitude: position.coords.latitude,
			longitude: position.coords.longitude
		});
	}, function() {
		alert("Impossible de recuperer la localisation")
	});
});