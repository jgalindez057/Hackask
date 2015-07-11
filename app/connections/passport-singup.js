/**
 * Created by juan on 10/07/15.
 */
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');

var passportSingup = function (server) {

    passport.use('singup', new LocalStrategy({
            usernameField: 'email',
            passReqToCallback: true // Permite pasar todo el request a req
        },
        function (req, email, password, done) {
            User.findOne({
                email: email
            }, function (err, user) {
                if (err) {
                    console.log(err)
                    return done(err);
                }
                if (user) {
                    console.log('Ya existe el usuario');
                    return done(null, false, {
                        message: 'Incorrect username.'
                    });
                } else {
                    var newUser = new User({
                        // set the user's local credentials
                        first_name: req.body.first_name,
                        last_name: req.body.last_name,
                        displayName: req.body.displayName,
                        email: email,
                        password: password
                    });
                    // save the user
                    newUser.save(function (err) {
                        if (err) {
                            console.log(req.body);
                            console.log('Error in Saving user: ' + err);
                            throw err;
                        }
                        console.log('User Registration succesful');
                        return done(null, newUser);
                    });
                }
            });
        }
    ));
};

module.exports = passportSingup;