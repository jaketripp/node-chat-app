var socket = io();

// get rooms and update select when you arrive at index.html
socket.emit('arrive');

var select = $('#selectRoom');
var customRoom = $('#customRoom');

// capitalize first letter in every word (can be multiple words)
function capitalize(str) {
	var arr = str.split(' ');
    return arr.map(function (word){
    	return word.charAt(0).toUpperCase() + word.slice(1);
    }).join(' ');
}

function pluralize(count, word) {
    return count === 1 ? count + ' ' + word : count + ' ' + word + 's';
}


// UX (disable one )
select.on('change', function(e){
	if (select.val()) {
		customRoom.prop('disabled', true);
	} else {
		customRoom.prop('disabled', false);
	}
});

customRoom.on('change', function(e){
	if (customRoom.val()) {
		select.prop('disabled', true);
		select.css('background', 'rgb(235, 235, 228)');
	} else {
		select.prop('disabled', false);
		select.css('background', 'white');
	}
});

// reset back to white and enabled
select.prop('disabled', false);
select.css('background', 'white');

socket.on('updateRoomList', function(rooms) {
	// get rooms and counts of users in rooms
	var roomsObj = rooms.reduce(function (allRooms, room) { 
	  if (room in allRooms) {
	    allRooms[room]++;
	  }
	  else {
	    allRooms[room] = 1;
	  }
	  return allRooms;
	}, {});

	// re-init
	select.empty();
	select.append('<option value=""></option>');
	
	// append rooms with # of users
	for (var room in roomsObj) {
		// The Office Fans - 1 user vs The Office Fans - 2 users
		var selectDisplay = capitalize(room) + ' - ' + pluralize(roomsObj[room], 'user');

		select.append('<option value="' + room + '">' + selectDisplay + '</option>');
	}

});
