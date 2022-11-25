const routes = require('express').Router();
const passport = require('passport');
require('../utils/googlePassport');

routes.get('/', passport.authenticate('google', {
    scope: ['email', 'profile']
}));

routes.get('/callback', passport.authenticate('google', {
    successRedirect: '/gAtuh/callback/success',
    failureRedirect: '/gAuth/callback/failure'
}));

routes.get('/callback/success', (req, res) => {
    res.send(req.user);
});

routes.get('/callback/failure', (req, res) => {
    res.send('Error');
});

module.exports = routes;