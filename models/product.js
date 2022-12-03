var sequelie = require('sequelize');

module.exports = (connection) => {
    var productSchema = connection.define('product', {
        id: {
            type: sequelie.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: sequelie.STRING
        },
        description: {
            type: sequelie.STRING
        },
        price: {
            type: sequelie.DOUBLE
        },
        active: {
            type: sequelie.BOOLEAN
        }
    });
    return productSchema;
}