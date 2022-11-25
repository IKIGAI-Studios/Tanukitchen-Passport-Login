let passport = require('passport');
let googleStrategy = require('passport-google-oauth2').Strategy;
require('dotenv').config();

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

passport.use(new googleStrategy({
    clientID: process.env.GOOGLEID,
    clientSecret: process.env.GOOGLESECRET,
    callbackURL: process.env.GOOGLECB,
    passReqToCallback: true
}, (req, accToken, refshToken, profile, done) => {
    return done(null, profile);
}));