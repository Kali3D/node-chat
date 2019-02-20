const path = require("path");
const http = require("http");
const express = require("express");
const socketIO = require("socket.io");


const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, "../public");

const app = express();
app.use(express.static(publicPath));

const server = http.createServer(app);
const io = socketIO(server);

io.on("connection", socket => {
	console.log("New user connected");
	socket.emit("newMessage", {from: "admin", text: "Welcome to the Chat App", createdAt: Date.now()});
	socket.broadcast.emit("newMessage", {from: "admin", text: "New user joined", createdAt: Date.now()});
	
	socket.on("disconnect", () => {
		console.log("User disconnected");
	});

	socket.on("createMessage", message => {
		console.log("Message created", message);



		io.emit("newMessage", {...message, createdAt: Date.now()});
//		socket.broadcast.emit("newMessage", {...message, createdAt: Date.now()});
	});

/*	socket.emit("newMessage", {
		from: "Nico",
		text: "Hi there !",
		createdAt: Date.now()
	});*/

});


server.listen(port, () => {
	console.log(`Started on port ${port}`);
});

module.exports = {app};