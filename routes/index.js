var express = require('express');
var router = express.Router();
var fs = require('fs');
var User = require('../passport/user');
var bCrypt = require('bcrypt-nodejs');

var isAuthenticated = function (req, res, next) {
	// if user is authenticated in the session, call the next() to call the next request handler 
	// Passport adds this method to request object. A middleware is allowed to add properties to
	// request and response objects
	if (req.isAuthenticated()){
        next();
	} else {
        res.statusCode = 401;
        next();
	}

}

module.exports = function(passport){

	/* GET login page. */
	router.get('/', function(req, res) {

    	// Display the Login page with any flash message, if any
		//res.render('index', { message: req.flash('message') });
        fs.readFile('./index.html', function (err, info) {
            if (err) {
                console.error(err);
                res.statusCode = 500;
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
	router.post('/login',  passport.authenticate('login',{
            successRedirect:"/",
            failureRedirect:"/"
        })
    );
   /* router.use('/signup', function(req, res) {
        req.logout();});*/
	/* Handle Registration POST */

	router.post('/signup', function(req, res){
        var username = req.body.username;
        var email = req.body.email;
        var password = req.body.password;
        // find a user in Mongo with provided username
        User.findOne({ 'username' :  username }, function(err, user) {
            // In case of any error, return using the done method
            if (err){
                // console.log('Error in SignUp: '+err);
                res.sendStatus(500).json(err);
            }
            // already exists
            if (user) {
                res.sendStatus(403).json('User Already Exists');
            } else {
                // if there is no user with that email
                // create the user
                var newUser = new User();
                // set the user's local credentials
                newUser.username = username;
                newUser.password = createHash(password);
                newUser.email = req.param('email');
                newUser.data = JSON.stringify([]);
                // save the user
                newUser.save(function(err) {
                    if (err){
                        //console.log('Error in Saving user: '+err);
                        throw err;
                    }
                    //console.log('User Registration succesful');
                    //  console.log(newUser);
                    req.login(newUser, function(err){
                        if (err) return next(err);
                        res.sendStatus(200);
                    });

                });
            }
        });
    }
    );

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
		if(req.user && req.user.data) {
            res.send(200).jsonp({name: req.user.username, data:req.user.data});
        }else{
			res.send(401);
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
        res.clearCookie('connect.sid', { path: '/' });
		res.redirect('/');
	});

    var createHash = function(password){
        return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
    }
	return router;
}





