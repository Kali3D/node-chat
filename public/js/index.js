const socket = io();

socket.on("connect", function() {
	console.log("Connected to server");
});
socket.on("disconnect", function() {
	console.log("Disconnected from server");
});
socket.on("newMessage", function(message) {
	console.log("New message received", message);
});

// socket.emit("createMessage", {
// 	to: "Oliv",
// 	text: "You're kro fort !"
// });
