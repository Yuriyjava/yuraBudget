var express = require('express');
var router = express.Router();
var fs = require('fs');
var User = require('../passport/user');

var isAuthenticated = function (req, res, next) {
	// if user is authenticated in the session, call the next() to call the next request handler 
	// Passport adds this method to request object. A middleware is allowed to add properties to
	// request and response objects
console.log(req.isAuthenticated());
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
/*    router.get('/signup', function(req, res) {
        // Display the Login page with any flash message, if any
        //res.render('index', { message: req.flash('message') });
        fs.readFile('./signUp.html', function (err, info) {
            if (err) {
                console.error(err);
                resp.statusCode = 500;
                return
            }
         res.end(info);
        });
    });*/
	/* Handle Login POST */
	router.post('/login',  function(req, res, next) {
        passport.authenticate('login',{
            session:true
        }, function(err, user, info) {
            if (err) {
                return next(err); // Error 500
            }

            if (!user) {
                //Authentication failed
                return res.json(401, { "error": req.flash('message')[0] });
            }
            //Authentication successful
            res.send(200);
        })(req, res, next);
    });

	/* Handle Registration POST */
	router.post('/signup',  function(req, res, next) {
        passport.authenticate('signup', function(err, user) {
            if (err) {
                return next(err); // Error 500
            }

            if (!user) {
                //Authentication failed
                return res.json(401, { "error": req.flash('message')[0] });
            }
            //Authentication successful

            res.send(200).jsonp({name: user.username, data:user.data});
        })(req, res, next);
    });

	/* GET User data */
	/*router.get('/home',  function(req, res) {
        // Display the Login page with any flash message, if any
        //res.render('index', { message: req.flash('message') });
        fs.readFile('./home.html', function (err, info) {
            if (err) {
                console.error(err);
                resp.statusCode = 500;
                return
            }
            res.end(info);
        });
	});*/

	router.get('/getData', isAuthenticated, function(req, res){
	    console.log(req);
		if(req.user.data) {
            res.send(200).jsonp({name: req.user.name, data:req.user.data});
        }else{
			res.send(403);
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





