var mysql = require('mysql');

// Create a database connection and export it from this file.
// You will need to connect with the user "root", no password,
// and to the database "chat".
var options;

if (process.env.RDS_HOSTNAME) {
	options = {
	  host : process.env.RDS_HOSTNAME,
	  port : process.env.RDS_PORT,
	  user : process.env.RDS_USERNAME,
	  password : process.env.RDS_PASSWORD,
	  database : process.env.RDS_DB_NAME
	};
} else{
	options = {
	  host:"localhost",
    user:"root",
	  password: "root",
	  database: "project"
	};
};


module.exports = mysql.createConnection(options);