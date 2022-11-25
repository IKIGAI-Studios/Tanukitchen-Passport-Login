const crypto = require('crypto');

function genPassword(password) {
    let salt = crypto.randomBytes(32).toString('hex');
    let hash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
    return {
        salt, hash
    }
}

function validarPassword(password, hash, salt) {
    let verifyHash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
    return hash  == verifyHash;
}

module.exports = {
    genPassword,
    validarPassword
}