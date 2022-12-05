let isAuth = (req, res, done) => {
    req.isAuthenticated() ? done() : res.redirect('/');
}

let isAdmin = (req, res, done) => {
    req.isAuthenticated() && req.user.admin ? done() : res.redirect('/protegida');
}

module.exports = {
    isAuth,
    isAdmin
}