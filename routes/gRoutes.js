const routes = require('express').Router();
const passport = require('passport');
require('../utils/passportGoogle');

routes.get('/', passport.authenticate('google', {
    scope: ['email', 'profile']
}));

routes.get('/callback', passport.authenticate('google', {
    successRedirect: '/gAuth/callback/success',
    failureRedirect: '/gAuth/callback/failure'
}));

routes.get('/callback/success', (req, res) => {
    res.send(req.user);
});

routes.get('/callback/failure', (req, res) => {
    res.send('No se pudo iniciar sesion con Google');
});

module.exports = routes;