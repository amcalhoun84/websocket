const express = require('express'),
	  app = express(),
	  server = require('http').createServer(app),
	  io = require('socket.io')(server);
	  port = process.env.PORT || 3000;

let timerID = null;
	sockets = new Set();

app.use(express.static(__dirname + '/dist'));

io.on('connection', socket => { 
	sockets.add(socket);
	console.log(`Socket ${socket.id} added`);

	if(!timerId) { 
		startTimer();
	}

	socket.on('clientdata', data => { 
		console.log(data);
	});

	socket.on('disconnect', () => { 
		console.log(`Deleting socket: ${socket.id}`);
		sockets.delete(socket;);
		console.log(`Remaining sockets: ${sockets.size}`);
	});
});

function startTimer() {
	timerId = setInterval(() => {
		if(!sockets.size) { 
			clearInterval(timerId);
			timerId = null;
			console.log("Timer has stopped");
		}

		let value = ((Math.random() * 50 + 1).toFixed(2));
		for(let s of sockets) { 
			console.log(`Socket emitting value: ${value}`);
			s.emit('data', { data: value });

		}
	}, 2000); // do this ever 2 seconds
}

server.listen(port);
console.log('Listening at http://localhost:3000');
console.log('Press Ctrl+C to interrupt process.');



