/*
 * Created by Yurii on 19.06.2017.
 */
var express = require('express');
var fs = require('fs');
var app = express();
var cookieParser = require('cookie-parser');
var session = require('express-session');
//var MongoClient = require('mongodb').MongoClient;
var MongoStore = require('connect-mongo')(session);
var format = require('util').format;
var db = require('./db.js');
var bodyParser = require('body-parser');


var url = 'mongodb://localhost:27017/test';

/*
MongoClient.connect(url, function (err, testdb) {
    if (err) console.log(err);
    console.log('connected to db');
    testdb.close();
});
*/

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

// Configuring Passport
var passport = require('passport');
app.use(session({
    secret: 'budget from Yura',
    store: new MongoStore({
        mongooseConnection: db
    }),
    genid: function(req) {
        return genuuid() ;// use UUIDs for session IDs
    },
    resave: false,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

// Using the flash middleware provided by connect-flash to store messages in session
// and displaying in templates
var flash = require('connect-flash');
app.use(flash());

// Initialize Passport
var initPassport = require('../passport/init');
initPassport(passport);

var routes = require('../routes/index')(passport);
app.use('/', routes);


/*app.get('/', function (req, resp) {
    fs.readFile('./index.html', function (err, info) {
        if (err) {
            console.error(err);
            resp.statusCode = 500;
            return
        }

        resp.end(info);
    });
});*/
app.get('/css/*', function (req, resp) {
    fs.readFile('./' + req.url, function (err, info) {
        if (err) {
            console.error(err);
            resp.statusCode = 500;
            return
        }

        resp.end(info);
    });
});

app.get('/dist/*', function (req, resp) {
    fs.readFile('./' + req.url, function (err, info) {
        if (err) {
            console.error(err);
            resp.statusCode = 500;
            return
        }
        resp.end(info);
    });
});
app.get('/libs/*', function (req, resp) {
    fs.readFile('./' + req.url, function (err, info) {
        if (err) {
            console.error(err);
            resp.statusCode = 500;
            return
        }
        resp.end(info);
    });
});

app.listen(8080, function () {
    console.log('server start')
});