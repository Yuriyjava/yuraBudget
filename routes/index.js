var express = require('express');
var router = express.Router();
var fs = require('fs');
var User = require('../passport/user');

var isAuthenticated = function (req, res, next) {
	// if user is authenticated in the session, call the next() to call the next request handler 
	// Passport adds this method to request object. A middleware is allowed to add properties to
	// request and response objects
	if (req.isAuthenticated())
		return next();
	// if the user is not authenticated then redirect him to the login page
	res.redirect('/');
}

module.exports = function(passport){

	/* GET login page. */
	router.get('/', function(req, res) {
    	// Display the Login page with any flash message, if any
		//res.render('index', { message: req.flash('message') });
        fs.readFile('./index.html', function (err, info) {
            if (err) {
                console.error(err);
                resp.statusCode = 500;
                return
            }

            res.send(info);
        });
	});

	/* Handle Login POST */
	router.post('/login', passport.authenticate('login', {
		successRedirect: '/home',
		failureRedirect: '/',
		failureFlash : true  
	}), function(res, req){
         res.jsonp({data: req.user.data})
    });

	/* Handle Registration POST */
	router.post('/signup', passport.authenticate('signup', {
		successRedirect: '/home',
		failureRedirect: '/signup',
		failureFlash : true  
	}), function(res, req){
		 res.jsonp({data: req.user.data})
 	});

	/*/!* GET User data *!/
	router.post('/getData', isAuthenticated, function(req, res){
		var userId =
        res.jsonp({data: req.user.data });
	});*/

    router.post('/saveData', isAuthenticated, function(req, res){
    	var userId = req._id;
        User.findByIdAndUpdate(userId,
            { data: req.data},
            function(err, user) {
                if (err) res.status(500).send(err);;
                console.log(user);
                res.status(200).send('OK');
            });

    });

	/* Handle Logout */
	router.get('/signout', function(req, res) {
		req.logout();
		res.redirect('/');
	});

	return router;
}





