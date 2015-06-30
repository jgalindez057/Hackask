var User = require('../models/user')

var userLogin = function(server) {

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
                displayName: petic.body.displayName,
                email: petic.body.email,
                password: petic.body.password
            });

            user.save (function (err) {
                if (err) {
                    console.log(err);
                    console.log(petic.body)
                resp.redirect("/singup");
                    return;
                }else{
            resp.render('home/index', {
                user: true,
                name: petic.body.first_name + " " + petic.body.last_name
            });
                }
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
            }, function (err, user) {
                if (user) {
                    console.log(user)
                	console.log("paso");
                    resp.redirect('/');
                }else{
                	resp.redirect("/" + user.displayName);
                }
            })
        });
};

module.exports = userLogin;
