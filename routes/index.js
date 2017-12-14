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

            res.end(info);
        });
	});

	/* Handle Login POST */
	router.post('/login', passport.authenticate('login', {
		successRedirect: '/home',
		failureRedirect: '/',
		failureFlash : true  
	}));

	/* Handle Registration POST */
	router.post('/signup', passport.authenticate('signup', {
		successRedirect: '/home',
		failureRedirect: '500',
		failureFlash : true
	}));

	/* GET User data */
	router.get('/home', isAuthenticated, function(req, res){

		if(req.user.data) {
            res.status(200).jsonp({data : req.user.data});
        }else{
			res.status(403).redirect('/');
		}
	});

    router.post('/saveData', function(req, res){
    	var userId = req.user._id;
        User.findOne({ '_id' : userId },
            function(err, user) {
                if (err) res.status(500).send(err);
                user.data = req.body.data;
				user.save();
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





