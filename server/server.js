
 /*
 * Created by Yurii on 19.06.2017.
*/
var express = require('express');
var fs      = require('fs');
var app     = express();
var cookieParser = require('cookie-parser');
var session = require('express-session');
var MongoClient = require('mongodb').MongoClient;
var MongoStore = require('connect-mongo')(session);
var format = require('util').format;
var db = require('./db.js');

var url = 'mongodb://localhost:27017/test';



MongoClient.connect(url, function (err, testdb) {
    if (err) console.log(err);
    console.log('connected to db');
    testdb.close();
});
app.use(cookieParser());

app.use(session({
    secret: 'budget from Yura',
    store: new MongoStore({
     mongooseConnection: db
    }),
    resave: false,
    saveUninitialized: true
}));

app.get('/', function(req, resp){
    fs.readFile('./index.html', function(err, info){
        if(err){
            console.error(err);
            resp.statusCode=500;
            return
        }

        resp.end(info);
    });
});
app.get('/*', function(req, resp){
    fs.readFile('./'+req.url, function(err, info){
        if(err){
            console.error(err);
            resp.statusCode=500;
            return
        }

        resp.end(info);
    });
});

app.listen(44206, function () {
    console.log('server start')
});