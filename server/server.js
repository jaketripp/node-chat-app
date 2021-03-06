const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const { generateMessage, generateLocationMessage } = require('./utils/message');
const { isRealString } = require('./utils/validation');
const { Users } = require('./utils/users');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();

var server = http.createServer(app);
var io = socketIO(server);

var users = new Users();
app.use(express.static(publicPath));

io.on('connection', (socket) => {
	socket.on('join', (params, callback) => {
		// make room case insensitive
		// custom feature #1
		params.room = params.room.toLowerCase();
		
		if (!isRealString(params.name) || !isRealString(params.room)) {
			return callback({title: 'Oops.. please user a valid name and room!', body: 'Make sure to use at least one alphanumeric character.'});
		} 

		if (!users.isUserUnique(params)) {
			return callback({title: 'Oops.. that name is already taken!', body: 'Please pick a different name.'});
		}

		socket.join(params.room);
		users.removeUser(socket.id);
		users.addUser(socket.id, params.name, params.room);
		io.to(params.room).emit('updateUserList', users.getUserList(params.room));
		io.emit('updateRoomList', users.getRoomList());
		// socket.leave('The Office Fans');

		// everyone in a room
		// io.emit -> io.to('The Office Fans').emit
		
		// everyone in a room besides yourself
		// socket.broadcast.emit -> socket.broadcast.to('The Office Fans').emit
		
		// to one person
		// socket.emit


		socket.emit('newMessage', generateMessage('Admin', `Welcome, ${params.name}!`));
		socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined.`));
		callback();


	});

	// list active chat rooms on index page
	socket.on('arrive', () => {
		io.emit('updateRoomList', users.getRoomList());
	});


	socket.on('createMessage', (message, callback) => {
		var user = users.getUser(socket.id);

		if (user && isRealString(message.text)) {
			io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
		}
		callback();
	});

	socket.on('createLocationMessage', (coords) => {
		var user = users.getUser(socket.id);

		if (user) {
			io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude));
		}
	});

	socket.on('disconnect', () => {
		var user = users.removeUser(socket.id);

		if (user) {
			io.emit('updateRoomList', users.getRoomList());
			io.to(user.room).emit('updateUserList', users.getUserList(user.room));
			io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left.`));
		}
	});
});

server.listen(port, () => {
	console.log(`Server running on port ${port}`);
});