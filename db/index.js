var mysql = require('mysql')

var options

if (process.env.RDS_HOSTNAME) {
	options = {
	  host : process.env.RDS_HOSTNAME,
	  port : process.env.RDS_PORT,
	  user : process.env.RDS_USERNAME,
	  password : process.env.RDS_PASSWORD,
	  database : process.env.RDS_DB_NAME
	}
} else {
	options = {
		host : 'aa4qb7hf7vsrnu.cvomhhylmjnk.us-west-2.rds.amazonaws.com',
	  port : '3306',
	  user : 'oocm',
	  password : 'masterpass',
	  database : 'ebdb'
	}
}


module.exports = mysql.createConnection(options)