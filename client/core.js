var socket = io('http://localhost:3000');

$('#button').click(function(){
	socket.emit('message', { texto: $('#text').val() });
	console.log('socket-emit mssage');
});
$('#channels').change(function(){
	socket.emit('change channel', $(this).val());
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
	console.log(obj);
});

$('#buttonadd').click(function(){

	socket.emit('change channel', $('#newchannel').val());

	$('#channels').append('<option value="' + $('#newchannel').val() + '" selected>' + $('#newchannel').val() + '</option>');

});
