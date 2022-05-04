const mysql = require("mysql");

const db_config = require("./config.js");

// Create a connection to the database
const connection = mysql.createConnection({
  host: db_config.host,
  user: db_config.user,
  password: db_config.password,
  database: db_config.database
});

// open the MySQL connection
connection.connect(error => {
  if (error) throw error;
  console.log("Successfully connected to database.");
});

module.exports = connection;