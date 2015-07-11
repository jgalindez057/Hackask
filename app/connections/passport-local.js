var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');

var passportLocal = function (server) {

    passport.use('login', new LocalStrategy({
            usernameField: 'email',
        },
        function (email, password, done) {
            User.findOne({
                email: email
            }, function (err, user) {
                if (err) {
                    console.log(err)
                    return done(err);
                }
                if (!user) {
                    console.log('Incorrect username.')
                    return done(null, false, {
                        message: 'Incorrect username.'
                    });
                }
                if (user.password != password) {
                    return done(null, false, {
                        message: 'Invalid password'
                    });
                }
                return done(null, user);
            });
        }
    ));
};

module.exports = passportLocal;
