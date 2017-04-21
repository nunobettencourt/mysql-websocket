/**
 * Created by nuno.bettencourt on 19/04/2017.
 */
//require database connection
var db = require('./dbconnection');

module.exports = function (socket) {
	// registration related behaviour goes here...
	socket.on('register', function (data) {
		// do stuff
	});

	socket.on('get event details', function(data){
		// New note added, push to all sockets and insert into db
		notes.push(data);
		io.sockets.emit('new note', data);
		// Use node's db injection format to filter incoming data
		db.query('INSERT INTO notes (note) VALUES (?)', data.note)
	});

};