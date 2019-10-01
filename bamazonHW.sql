SET SQL_SAFE_UPDATES = 0;
DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;
use bamazon_db;
CREATE TABLE products(
	item_id INTEGER(100) NOT NULL AUTO_INCREMENT,

	product_name VARCHAR(50) NOT NULL,
	department_name VARCHAR(50) NOT NULL,

	price DECIMAL (10, 2) NOT NULL,
	stock_quantity INTEGER (100) NOT NULL,

	PRIMARY KEY (item_id)
);
INSERT INTO products (product_name, department_name,price,stock_quantity) VALUES 
("potato", "food",1.50,1000),
("po", "food",200,5),
("ta", "notfood",3.56,10000),
("TOE", "notfood",1.50,1000),
("OT", "food",4.2,107),
("WAEF", "notfood",6.25,43),
("potato", "food",1.50,6),
("cxvafds", "clothes",1.50,15070), 
("nope", "badfood",1.50,104),
("qwheee", "badfood",1.50,32473);

SELECT * FROM products;
