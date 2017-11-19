var socket = io();

socket.on('connect', function() {
	console.log('Connected to server');

	socket.emit('createMessage', {
		from: 'Jake',
		text: 'Hey. This is Jake.'
	});
});

socket.on('disconnect', function() {
	console.log('Disconnected from server');
});

socket.on('newMessage', function(message) {
	console.log('newMessage', message);
});