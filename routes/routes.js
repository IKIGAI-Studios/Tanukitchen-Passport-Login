const routes = require('express').Router();
const passport = require('passport');
const {User} = require('../utils/connection');
const {genPassword} = require('../utils/passwordUtils');
const {isAuth, isAdmin} = require('../utils/auth');
var abc

routes.get('/login', (req, res) => {
    res.render('login');
});

routes.get('/register', (req, res) => {
    res.render('register');
});

routes.get('/protected', isAuth, (req, res) => {
    res.render('protected');
});

routes.get('/admin', isAdmin, (req, res) => {
    res.render('admin');
});

routes.get('/logout', (req, res, done) => {
    req.logOut((e) => {return done(e)});
    res.redirect('/login');
});

routes.post('/login', passport.authenticate('local', {
    failureRedirect: '/login',
    successRedirect: '/protected'
}));

routes.post('/register', (req, res) => {
    var saltHash = genPassword(req.body.password);
    var salt = saltHash.salt;
    var hash = saltHash.hash;

    req.body.salt = salt;
    req.body.hash = hash;
    req.body.password = "";
    req.body.admin = false;

    User.create(req.body)
    .then ((usr) => {
        console.info(usr);
    })
    .catch ((e) => {
        console.error(`Error: $e`);
    });

    res.redirect('/login');
});



module.exports = routes;