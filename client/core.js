var socket = io('http://localhost:3000');

$('#button').click(function(){
	socket.emit('message', { texto: $('#text').val() });
	console.log('socket-emit mssage');
});
$('#channels').change(function(){

	socket.emit('change channel', $(this).val());

	$('#current').val( $(this).val() );
});

socket.on('message', function(msg){
	if(Object.prototype.isPrototypeOf(msg))
	{
		$('#messages').append('<li>' + msg.texto + '</li>');
	}
	else
	{
		$('#messages').append('<li>' + msg + '</li>');
	}

});

socket.on('rooms', function(obj){

	var rooms = getRooms(obj);
	$('#channels').html('');

	$(rooms).each(function(a,b){
		$('#channels').append('<option value="' + b + '">' + b + '</option>');
	});
});

$('#buttonadd').click(function(){

	socket.emit('change channel', $('#newchannel').val());

	$('#channels').append('<option value="' + $('#newchannel').val() + '">' + $('#newchannel').val() + '</option>');

	$('#current').val( $('#newchannel').val() );
});

function getRooms(obj)
{
	var rooms = [];
	var i = 0;

	for(var room in obj){
		if (room.startsWith('room-'))
		{
			rooms[i] = room.substr(5);
			i++;
		}
	}

	return rooms;
}