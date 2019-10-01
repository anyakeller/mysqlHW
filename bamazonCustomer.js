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
    console.log("Products");
    console.log("--------");
    var products = [];
    for (var i = 0; i < results.length; i++) {
        products.push(results[i]);
        displayItem(results[i]);
    }
    // console.log(fields);
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
            var theItem = results[ans.productid - 1];
            if (!theItem) {
                console.log("Does not exisit!");
                connection.end();
            } else {
                var resultQuantity = theItem.stock_quantity - ans.quantity;
                if (resultQuantity >= 0) {
                    updateStock(ans.productid, resultQuantity);
                    console.log(
                        "You bought " +
                            ans.quantity +
                            " of " +
                            theItem.product_name
                    );
                } else {
                    console.log("Insufficient Quantity");
                    connection.end();
                }
            }
        });
});

function displayItem(item) {
    console.log("Product:", item.product_name);
    console.log("ID:", item.item_id);
    console.log("Price:", item.price);
    console.log("--------------");
}

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
