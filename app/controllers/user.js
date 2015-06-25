var User = require('../models/userjohn')

var userLogin = function(server) {

    server.route("/logout/facebook")
        .get(function (petic, resp) {
            petic.logout();
            resp.redirect('/');
        });

    server.route("/logout")
        .get(function (petic, resp) {
            petic.logout();
            resp.redirect('/');
        });

    server.route("/singup")
        .get(function (petic, resp) {
            resp.render('user/singup');
        })
        .post(function (petic, resp) {
            var user = new User({
                first_name: petic.body.first_name,
                last_name: petic.body.last_name,
                username: petic.body.username,
                email: petic.body.email,
                password: petic.body.password
            });

            user.save (function(err) {
                if (err) {
                    console.log("error");
                    console.log(petic.body)
                    return;
                }
            });
            resp.render('home/index', {
                prove: true,
                name: petic.body.first_name + " " + petic.body.last_name
            });
        });

    server.route("/singin")
        .get(function (petic, resp) {
            resp.render('user/singin');
        })
        .post(function (petic, resp) {
            User.findOne({
                email: petic.body.email,
                password: petic.body.password
            }, function(err, user) {
                if (user) {
                	console.log("paso");
                    resp.render('home/index', {
                        prove: true,
                        name: user.username
                    });
                }else{
                	resp.render("/singin");
                }
            })
        });
};

module.exports = userLogin;
