/*
 /!**
 * Created by Yurii on 19.06.2017.
 *!/
 var http=require('http');
 var fs=require('fs')

 var server=new http.Server(function(req, resp){
 var info;
 console.log(req.url);
 if (req.method==="GET"){
 if(req.url=='/'){
 fs.readFile('../index.html', function(err, info){
 if(err){
 console.error(err);
 resp.statusCode=500;
 return
 }

 resp.end(info);
 });
 }else{
 fs.readFile('../'+req.url,function(err, info){
 if(err){
 console.error(err);
 resp.statusCode=500;
 return
 }

 resp.end(info);
 });
 }
 }
 });
 server.listen(82,'127.0.0.1');*/
var express = require('express');
var fs      = require('fs');
var app     = express();

app.all('*',function(req, resp){
    var info;
    console.log(req.url);
    if (req.method==="GET"){
        if(req.url=='/'){
            fs.readFile('./index.html', function(err, info){
                if(err){
                    console.error(err);
                    resp.statusCode=500;
                    return
                }

                resp.end(info);
            });
        }else{
            fs.readFile('./'+req.url,function(err, info){
                if(err){
                    console.error(err);
                    resp.statusCode=500;
                    return
                }

                resp.end(info);
            });
        }
    }
});


app.listen(44206, function () {
    console.log('server start')
});