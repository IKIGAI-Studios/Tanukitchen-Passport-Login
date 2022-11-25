const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const usermodel = require('../models/user');
const {User} = require('./connection');
const {valPassword} = require('./password');

customFields = {
    usernameField: 'username',
    passwordField: 'password'
}

let verifyCallback = (username, password, done) => {
    User.findOne({
        where: {
            username: username
        }
    })
    .then((user) => {
        if(!user) return done(null, false);
        let isValid = valPassword(password, user.hash, user.salt);

        if(isValid) return done(null,user);
        
        return done(null, false);
    })
    .catch((e) => {
        return done(e);
    });
}

let strategy = new LocalStrategy(customFields, verifyCallback);
passport.use(strategy);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((userId, done) => {
    User.findByPk(userId)
    .then((user) => {
        done(null, user);
    })
    .catch((e) => {
        done(e);
    })
});