const path = require("path");
const http = require("http");
const express = require("express");
const socketIO = require("socket.io");

const {generateMessage} = require("./utils/message");


const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, "../public");

const app = express();
app.use(express.static(publicPath));

const server = http.createServer(app);
const io = socketIO(server);

io.on("connection", socket => {
	console.log("New user connected");
	socket.emit("newMessage", generateMessage("admin", "Welcome to the Chat App"));
	socket.broadcast.emit("newMessage", generateMessage("admin", "New user joined"));
	
	socket.on("disconnect", () => {
		console.log("User disconnected");
	});

	socket.on("createMessage", (message, callback) => {
		console.log("Message created", message);
		io.emit("newMessage", generateMessage(message.from, message.text));
		callback("This is from the server");
	});

});


server.listen(port, () => {
	console.log(`Started on port ${port}`);
});

module.exports = {app};