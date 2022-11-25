const express = require('express');
const session = require('express-session');
const passport = require('passport');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const {connection} = require('./utils/connection');
const routes = require('./routes/routes');
const gRoutes = require('./routes/gRoutes')

require('dotenv').config();

const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended:true}));

let myStore = new SequelizeStore({
    db: connection
});

app.use(session({
    secret: process.env.SECRETSESSION,
    resave: false,
    saveUninitialized: true,
    store: myStore,
    cookie: {
        maxAge: 1000*60*60*24
    }
}));

myStore.sync();

require('./utils/passport');
require('./utils/passportGoogle');
app.use(passport.initialize());
app.use(passport.session());
app.use('/', routes);
app.use('/gAuth', gRoutes);

PORT = process.env.PORT;
app.listen(PORT, () => {
    console.info(`Servidor activo en el puerto ${PORT}`);
});