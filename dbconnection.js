/**
 * Created by nuno.bettencourt on 19/04/2017.
 */
var mysql = require('mysql');

// Define DB access data
var db = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	database: 'chronit_rally'
});

module.exports = db;

