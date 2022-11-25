let passport = require('passport');
let localStrategy = require('passport-local').Strategy;
let {User} = require('./connection');
let {validarPassword} = require('./passwordUtils');

customFields = {
    usernameField: 'username',
    passwordField: 'password'
}

let verifyCallback = (user, pass, done) => {
    User.findOne({
        where: {
            username: user
        }
    })
    .then((usr) => {
        if(!usr) return done(null, false);
        let isValid = validarPassword(pass, usr.hash, usr.salt);
        if(isValid) return done(null, usr);
        else return done(null, false);
    })
    .catch((err) => {
        return done(err);
    });
}

let strategy = new localStrategy(customFields, verifyCallback);
passport.use(strategy);

passport.serializeUser((usr, done) => {
    done(null, usr.id);
});

passport.deserializeUser((userId, done) => {
    User.findByPk(userId)
    .then((usr) => {
        done(null, usr);
    })
    .catch((e) => {
        done(err);
    })
});