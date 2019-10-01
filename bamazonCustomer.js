var inquirer = require("inquirer");
var mysql = require("mysql");

// create db connection
var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "bamazon_db",
    password: "password"
});

connection.connect(function(err) {
    if (err) {
        console.error("error connecting: " + err.stack);
        return;
    }

    console.log("connected as id " + connection.threadId);
});

connection.query("SELECT * FROM products", function(error, results, fields) {
    if (error) throw error;
    console.log(results);
    // console.log(fields);
});

connection.end();
