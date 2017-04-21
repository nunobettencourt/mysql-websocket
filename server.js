// socket.io listening on port 3000
var io = require('socket.io').listen(3000);

//require db connection
var db = require('./dbconnection');

//load models
var Event = require('./models/Event');

var events = [];
var isInitLoad = false;
var socketCount = 0;

io.sockets.on('connection', function(socket){

	// Socket has connected, increase socket count
	socketCount++;
	// Let all sockets know how many are connected
	console.log("users connected: ", socketCount);
	io.sockets.emit('users connected', socketCount);

	socket.on('disconnect', function() {
		// Decrease the socket count on a disconnect, emit
		socketCount--;
		console.log("users connected: ", socketCount);
		io.sockets.emit('users connected', socketCount);
	});

	// Check to see if initial load is set
	if (! isInitLoad) {
		// Initial app start, run db query
		Event.getAllEvents()
			.on('result', function(data){
				// Push results onto the events array
				events.push(data)
			})
			.on('end', function(){
				// Only emit events after query has been completed
				socket.emit('initial events', events)
			})

		isInitLoad = true
	} else {
		// Initial events already exist, send out
		socket.emit('initial events', events)
	}

});