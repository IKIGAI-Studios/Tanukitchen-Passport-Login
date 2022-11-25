const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
require('dotenv').config();

passport.serializeUser( (user, done) => {
    done(null, user);
});

passport.deserializeUser( (user, done) => {
    done(null, user);
});

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLEID,
    clientSecret: process.env.GOOGLESECRET,
    callbackURL: process.env.GOOGLECALLBACK,
    passReqToCallback: true
}, (req, accessToken, refreshToken, profile, done) => {
    return done(null, profile);
}));