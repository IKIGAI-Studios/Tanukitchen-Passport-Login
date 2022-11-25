var sequelie = require('sequelize');

module.exports = (connection) => {
    var userSchema = connection.define('user', {
        id: {
            type: sequelie.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: sequelie.STRING
        },
        hash: {
            type: sequelie.STRING
        },
        salt: {
            type: sequelie.STRING
        },
        admin: {
            type: sequelie.BOOLEAN
        }
    });
    return userSchema;
}