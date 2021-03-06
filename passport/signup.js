/**
 * Created by Yurii on 12.12.2017.
 */
var LocalStrategy   = require('passport-local').Strategy;
var User = require('./user');
var bCrypt = require('bcrypt-nodejs');

module.exports = function(passport){

    passport.use('signup', new LocalStrategy({
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function(req, username, password, done) {

            findOrCreateUser = function(){
                // find a user in Mongo with provided username
                User.findOne({ 'username' :  username }, function(err, user) {
                    // In case of any error, return using the done method
                    if (err){
                      // console.log('Error in SignUp: '+err);
                        return done(err);
                    }
                    // already exists
                    if (user) {

                        return done(null, false, req.flash('message','User Already Exists'));
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
                            req.login();
                            return done(null, newUser);
                        });
                    }
                });
            };
            // Delay the execution of findOrCreateUser and execute the method
            // in the next tick of the event loop
            process.nextTick(findOrCreateUser);
        })
    );

    // Generates hash using bCrypt
    var createHash = function(password){
        return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
    }

}