var isAuth = (req, res, done) => {
    req.isAuthenticated() ? done() : res.redirect('/login');
}
let isAdmin = (req, res, done) => {
    req.isAuthenticated() && req.user.admin ? done() : res.redirect('/protected');
}

module.exports = {
    isAuth,
    isAdmin
}