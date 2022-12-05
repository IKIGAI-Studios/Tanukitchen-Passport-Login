const routes = require('express').Router();
const passport = require('passport');
const {User, Product} = require('../utils/connection');
const {genPassword} = require('../utils/passwordUtils');
const {isAuth, isAdmin} = require('../utils/auth');
const product = require('../models/product');
var abc

routes.get('/login', (req, res) => {
    res.render('login');
});

routes.get('/register', (req, res) => {
    res.render('register');
});

routes.get('/protected', isAuth, (req, res) => {
    let usr = req.user;
    usr.admin ? res.redirect('admin_view') : res.render('protectedLocal', {usr});
});
                        //isAdmin,
routes.get('/admin_view', isAdmin, (req, res) => {
    let usr = req.user;
    res.render('admin_view', {usr});
});
                                // isAdmin, 
routes.get('/admin_view_products', isAdmin, (req, res) => {
    Product.findAll({
        where: {
            active: true
        }
    })
    .then((products) => {
        products.lenght != 0 ? res.render('admin_view_products', {products}) : res.send('No existen productos');
    })
    .catch((e) => {
        res.send(`Error: ${e}`);
    })
});

routes.get('/basic_view_products', (req, res) => {
    Product.findAll({
        where: {
            active: true
        }
    })
    .then((products) => {
        products.lenght != 0 ? res.render('basic_view', {products}) : res.send('No existen productos');
    })
    .catch((e) => {
        res.send(`Error: ${e}`);
    })
});
                           
routes.get('/admin_view_users', isAdmin, (req, res) => {
    User.findAll()
    .then((users) => {
        users.lenght != 0 ? res.render('admin_view_users', {users}) : res.send('No existen usuarios');
    })
    .catch((e) => {
        res.send(`Error: ${e}`);
    })
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
        console.error(`Error: ${e}`);
    });

    res.redirect('/login');
});

routes.post('/new_product', (req, res) => {
    req.body.active = true;
    Product.create(req.body)
    .then ((prod) => {
        res.redirect('/admin_view_products');
    })
    .catch ((e) => {
        console.error(`Error: ${e}`);
    });
});

routes.post('/upd_product', (req, res) => {
    Product.update(req.body, {
            where: {
                id: req.body.id
            }
        })
    .then (() => {
        res.redirect('/admin_view_products');
    })
    .catch ((e) => {
        console.error(`Error: ${e}`);
    });
});

routes.post('/upd_user', (req, res) => {
    req.body.admin == 'on' ? req.body.admin = true : req.body.admin = false;
    User.update(req.body, {
            where: {
                id: req.body.id
            }
        })
    .then (() => {
        res.redirect('/admin_view_users');
    })
    .catch ((e) => {
        console.error(`Error: ${e}`);
    });
});

routes.get('/remove_product/:id', (req, res) => {
    req.body.active = false;
    Product.update(req.body, {
        where: {
            id: req.params.id
        }
    })
    .then(() => {
        res.redirect('../admin_view_products');
    })
    .catch((e) => {
        console.error(`Error: ${e}`);
    })
});

routes.get('/remove_user/:id', (req, res) => {
    User.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(() => {
        res.redirect('../admin_view_users');
    })
    .catch((e) => {
        console.error(`Error: ${e}`);
    })
});
//Agregar boton de logout

module.exports = routes;