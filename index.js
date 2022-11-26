const routes = require('./routes/routes');
const routesG = require('./routes/googleRoutes');
const express = require('express');
const path = require('path');
var session = require('express-session');
var passport = require('passport');
var SequelizeStore = require('connect-session-sequelize')(session.Store);
var {Connection} = require('./utils/connection');

require('dotenv').config();
const app = express();

app.use(
    "/scss", 
    express.static(path.join(__dirname, 'src/assets/scss'))
)

app.use(
    "/js", 
    express.static(path.join(__dirname, 'src/assets/js'))
)

app.use(
    "/img", 
    express.static(path.join(__dirname, 'src/imgs'))
)


app.set('view engine', 'ejs');
app.use(express.urlencoded({extended:true}));

var myStore = new SequelizeStore({
    db: Connection
});

app.use(session({
    secret: process.env.SECRETSESSION,
    resave: false,
    saveUninitialized: true,
    store: myStore,
    cookie: {
        maxAge: 1000*60*24
    }
}));

myStore.sync();

app.use(passport.initialize());
app.use(passport.session());
require('./utils/passport');
require('./utils/googlePassport');
app.use('/', routes);
app.use('/gAuth', routesG);

PORT = process.env.PORT;
app.listen(PORT, () => {
    console.info(`Servidor activo en el puerto ${PORT}`);
});