/**
 * Created by juan on 10/07/15.
 */
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');

var passportSingup = function (server) {

    passport.use('singup', new LocalStrategy({
            usernameField: 'displayName',
            passReqToCallback: true // Permite pasar todo el request a req
        },
        function (req, displayName, password, done) {
            User.findOne({
                displayName: displayName
            }, function (err, user) {
                if (err) {
                    console.log(err);
                    return done(err);
                }
                if (user) {
                    console.log('Ya existe un usuario con ese nombre');
                    return done(null, false, 
                        req.flash('message', 'Ya existe un usuario con ese nombre'));
                } else {
                    var newUser = new User();
                        // set the user's local credentials
                        newUser.displayName = req.body.displayName;
                        newUser.email = email;
                        newUser.password = password;
                        newUser.confirmPassword = req.body.confirmPassword;
                        newUser.url_foto = '/img/user-icon.png';
                    // save the user
                    newUser.save(function (err) {
                     if (newUser.password != newUser.confirmPassword) {
                            console.log(req.body);
                            console.log('Las contraseñas con coinciden:');
                        return done(null, false, {
                        message: 'Error in Saving user.'
                    });
                        }                    

                        if (err) {
                            console.log(req.body);
                            console.log('Error in Saving user: ' + err);
                        return done(null, false, {
                        message: 'Error in Saving user.'
                    });
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