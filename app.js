const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const cors = require('cors');

//database URL
//local
const url = 'mongodb://127.0.0.1:27017/capstone';

var corsOptions = {
    origin: 'http://localhost:8080',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

//connection to Mongo Database
let connect = '';

//production

if (process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
    connection_string = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
        process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
        process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
        process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
        process.env.OPENSHIFT_APP_NAME;
    connect = mongoose.connect(urmongodb_connection_stringl, {useNewUrlParser: true});
} else {
    connect = mongoose.connect(url, {useNewUrlParser: true});
    console.log('Entorno Local')
}

connect.then((db) => {
    console.log('!! --> Connected Correctly to Database Server <-- !!');
}).catch(err => console.log(err));

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const clientsRouter = require('./routes/clients');
const salesRouter = require('./routes/sales');
const leadsRouter = require('./routes/leads');
const loginRouter = require('./routes/login');
const logoutRouter = require('./routes/logout');
const signupRouter = require('./routes/signup');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
// app.use(cookieParser('12345-67890-09876-54321'));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    name: "session-id",
    secret: "12345-67890-09876-54321",
    saveUninitialized: false,
    resave: false,
    store: new FileStore()
}));
app.use('/login',loginRouter);
app.use('/logout',logoutRouter);
app.use('/signup',signupRouter);

//user authentification
function auth(req, res, next) {
    console.log(req.session.user);
    if (!req.session.user) {
        res.status(403).send({
            success: false,
            message: "You're not Authorized",
            error: new Error(message),
        });
        next(error);
    } else {
        if (req.session.user === 'authenticated') {
            next()
        } else {
            res.status(403).send({
                success: false,
                message: "You're not Authorized",
                error: new Error(message),
            });
            next(error);
        }
    }

}

//require Auth
//app.use(auth);
app.use(cors(corsOptions));
//set routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/clients', clientsRouter);
app.use('/sales', salesRouter);
app.use('/leads', leadsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
