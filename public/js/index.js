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

$("#messageForm").on("submit", function(event){
	event.preventDefault();
	socket.emit("createMessage", {
		from: "Nico",
		text: $("#message").val()
	}, function(data) {
		console.log("got it ! : ", data);
	});
});