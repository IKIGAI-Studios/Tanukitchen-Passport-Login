const routes = require('express').Router();
const passport = require('passport');
const {user} = require('../utils/connection');
const {genPassword} = require('../utils/password');
const {isAuth, isAdmin} = require('../utils/auth');

routes.get('/', (req, res) => {
    res.render('login');
});

routes.post('/login', passport.authenticate('local', {
    failureRedirect: '/',
    successRedirect: '/protegida'
}));

routes.get('/registro', (req, res) => {
    res.render('registro');
});

routes.post('/registro', (req, res) => {
    let saltHash = genPassword(req.body.password);
    let salt = saltHash.salt;
    let hash = saltHash.hash;

    req.body.salt = salt;
    req.body.hash = hash;
    req.body.password = "";
    req.body.admin = false;

    user.create(req.body)
    .then((user) => {
        console.info(user);
    })
    .catch((e) => {
        console.info(`ERROR ${e}`);
    });
    res.redirect('/');
});

routes.get('/protegida', isAuth, (req, res) => {
    res.render('protegida');
});

routes.get('/admins', isAdmin, (req, res) => {
    res.render('admins');
});

routes.get('/logout', (req, res, done) => {
    req.logout((e) => {
        return done(e);
    });
    res.redirect('/');
});




module.exports = routes;