var inquirer = require("inquirer");
var mysql = require("mysql");

// create db connection
var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "bamazon_db",
    password: "password"
});

// actually connect
connection.connect(function(err) {
    if (err) {
        console.error("error connecting: " + err.stack);
        return;
    }
    console.log("connected as id " + connection.threadId);
});

// get products query
connection.query("SELECT * FROM products", function(error, results, fields) {
    if (error) throw error; //error case
    //if no error
    console.log("Products");
    console.log("--------");
    var products = [];
    // create a copy of resuls becaue why not
    for (var i = 0; i < results.length; i++) {
        products.push(results[i]);
        displayItem(results[i]); //display the items while at it
    }
    // console.log(fields);
    // get user purchase info
    inquirer
        .prompt([
            {
                type: "input",
                name: "productid",
                message: "Enter a product ID:"
            },
            {
                type: "input",
                name: "quantity",
                message: "Enter a quantity:"
            }
        ])
        .then(function(ans) {
            //check for in stock
            var theItem = results[ans.productid - 1]; // check if the item id exisits
            if (!theItem) {
                //if not there
                console.log("Does not exisit!");
                connection.end();
            } else {
                //if there
                //check if there is enough
                var resultQuantity = theItem.stock_quantity - ans.quantity;
                // if there is enouch
                if (resultQuantity >= 0) {
                    //update stock
                    updateStock(ans.productid, resultQuantity);
                    console.log(
                        "You bought " +
                            ans.quantity +
                            " of " +
                            theItem.product_name
                    );
                } else {
                    //otherwise
                    console.log("Insufficient Quantity");
                    connection.end();
                }
            }
        });
});

//display item helper
function displayItem(item) {
    console.log("Product:", item.product_name);
    console.log("ID:", item.item_id);
    console.log("Price:", item.price);
    console.log("--------------");
}

var dbstuff =
    "SET SQL_SAFE_UPDATES = 0; DROP DATABASE IF EXISTS bamazon_db; CREATE DATABASE bamazon_db; use bamazon_db; CREATE TABLE products( id INTEGER(100) NOT NULL AUTO_INCREMENT,product_name VARCHAR(50) NOT NULL,department_name VARCHAR(50) NOT NULL,PRIMARY KEY (id));";

//helper func to update stock
function updateStock(id, newQuantity) {
    connection.query(
        "UPDATE products SET stock_quantity = " +
            newQuantity +
            " WHERE item_id = " +
            id +
            ";",
        function(error, results, fields) {
            if (error) throw error;
        }
    );
    connection.end();
}
