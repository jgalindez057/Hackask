var User = require('../models/user');
var passport = require('passport');
var getQuestions = require('../middlewares/getquestions');
var getCategories = require('../middlewares/getcategories');

var userLogin = function(server) {

    server.route("/logout")
        .get(function(petic, resp) {
            petic.logout();
            resp.redirect('/');
        });


    server.route("/singup")
        .get(function(petic, resp) {
            resp.render('user/singup');
        })
        .post(
        passport.authenticate('singup', {
            successRedirect: '/',
            failureRedirect: '/err'
        })
    );

    server.route("/login")
        .get(function(petic, resp) {
            resp.render('user/login');
        })
        .post(
        passport.authenticate('login', {
                successRedirect: '/',
            failureRedirect: '/login'
            })
        );
};

module.exports = userLogin;
