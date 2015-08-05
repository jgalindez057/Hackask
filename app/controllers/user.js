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
        .post(
        passport.authenticate('singup', {
            successRedirect: '/',
            failureRedirect: '/access'
        })
    );

    server.route("/access")
        .get(function(petic, resp) {
            resp.render('user/access');
        })
        .post(
        passport.authenticate('login', {
            successRedirect: '/',
            failureRedirect: '/access'
            })
        );
};

module.exports = userLogin;
