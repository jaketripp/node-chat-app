var select = $('#selectRoom');
var customRoom = $('#customRoom');

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

var roomsString = localStorage.getItem('rooms');
var rooms = roomsString.split(',');

var roomsObj = rooms.reduce(function (allRooms, room) { 
  if (room in allRooms) {
    allRooms[room]++;
  }
  else {
    allRooms[room] = 1;
  }
  return allRooms;
}, {});

for (var room in roomsObj) {
	select.append('<option value="' + room + '">' + room + ' - ' + roomsObj[room] + ' user(s)</option>');
}