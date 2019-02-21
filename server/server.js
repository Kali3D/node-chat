const path = require("path");
const http = require("http");
const express = require("express");
const socketIO = require("socket.io");

const {generateMessage, generateLocationMessage} = require("./utils/message");
const {isRealString} = require("./utils/validation");
const {Users} = require("./utils/users");

const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, "../public");

const app = express();
app.use(express.static(publicPath));

const server = http.createServer(app);
const io = socketIO(server);
const users = new Users();
//io.emit -> envoie à tous les connectés
//socket.broadcast.emit -> envoie à tous les connectés sauf l'émetteur
//socket.emit -> envoie juste à un user

//io.to(params.room).emit -> envoie à tous les connectés de cette room
//socket.broadcast.to(params.room).emit -> envoie à tous les connectés de cette room sauf l'émetteur

io.on("connection", socket => {
	
	socket.on("join", (params, callback) => {
		if (!isRealString(params.name) || !isRealString(params.room))
			return callback("Name and room name are required");
		socket.join(params.room);
		users.removeUser(socket.id);
		users.addUser(socket.id, params.name, params.room);
		io.to(params.room).emit("updateUserList", users.getUserList(params.room));
		socket.emit("newMessage", generateMessage("admin", "Welcome to the Chat App"));
		socket.broadcast.to(params.room).emit("newMessage", generateMessage("admin", `${params.name} joined`));
		callback();
	});

	socket.on("disconnect", () => {
		const user = users.removeUser(socket.id);
		if (user) {
			io.to(user.room).emit("updateUserList", users.getUserList(user.room));
			io.to(user.room).emit("newMessage", generateMessage("admin", `${user.name} has left`));
		}
		console.log("User disconnected");
	});

	socket.on("createMessage", (message, callback) => {
		const user = users.getUser(socket.id);
		if (user && isRealString(message.text))
			io.to(user.room).emit("newMessage", generateMessage(user.name, message.text));
		callback();
	});

	socket.on("createLocationMessage", coords => {
		const user = users.getUser(socket.id);
		if (user)
			io.to(user.room).emit("newLocationMessage", generateLocationMessage(user.name, coords.latitude, coords.longitude));
	});

});


server.listen(port, () => {
	console.log(`Started on port ${port}`);
});

module.exports = {app};