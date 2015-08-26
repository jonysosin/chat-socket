var app = require('http').createServer(handler)
var io = require('socket.io')(app);
var fs = require('fs');

app.listen(3000);

function handler (req, res) {
  fs.readFile(__dirname + '/index.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    res.writeHead(200);
    res.end(data);
  });
}

/*
- create a room
- get code of room
- destroy room
- get my room
- send match
	Por cada sala crear dos salas, una de hombres y otra de mujeres
-
*/

io.on('connection', function (socket) {

	var channel = 'channel-a';

	console.log('usuario id: %s', socket.id);

	//socket.broadcast.emit('message', 'El usuario ' + socket.id + ' se ha conectado', 'System'); All not me
	io.emit('message', 'El usuario ' + socket.id + ' se ha conectado', 'System');

	socket.join(channel);

	socket.on('message', function(msg){
		//io.emit('message', msg, socket.id); -> envia a todos los canales
		//io.sockets.join(channel).emit('message', msg, socket.id); // Todos los del canal
		socket.broadcast.to(channel).emit('message', msg, socket.id); // Todos menos yo
		console.log(channel, msg, socket.id);
	});

	socket.on('disconect', function(){
		console.log('Se desconecto %s', socket.id);
	});

	socket.on('change channel', function(newChannel){
		if(newChannel != channel) {
			console.log(newChannel);
			newChannel = 'room-' + newChannel;
			socket.leave(channel);
			socket.join(newChannel);
			channel = newChannel;

			io.emit('rooms', io.sockets.adapter.rooms);
		}
	});

});