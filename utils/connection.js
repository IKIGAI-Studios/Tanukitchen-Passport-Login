const sequelie = require('sequelize');
const userModel = require('../models/user');
const productModel = require('../models/product');
require('dotenv').config();

const Connection = new sequelie(process.env.DBNAME, process.env.DBUSER, process.env.DBPASS, {
    host: process.env.DBSERVER,
    dialect: process.env.DBDIALECT,
    port: process.env.DBPORT
});

const User = userModel(Connection);
const Product = productModel(Connection);

Connection.sync({force:false})
.then(() => {
    console.info("Conectado a MYSQL");
})
.catch((e) => {
    console.error(`Error: ${e}`);
});

module.exports = {
    User, 
    Product,
    Connection
}