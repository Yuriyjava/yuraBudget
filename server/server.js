
 /*
 * Created by Yurii on 19.06.2017.
*/
var express = require('express');
var fs      = require('fs');
var app     = express();

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