var User = require('../models/user');
var getQuestions = require('../middlewares/getquestions');
var getCategories = require('../middlewares/getcategories');

var homeController = function(server) {
    console.log("Home controller Funcionando");

    server.route("/")
        .get(getQuestions, getCategories, function (petic, resp) {
            if (petic.user) {
                console.log("llego");
                User.findOne({
                    password : petic.user.id
                }, function (err, user) {
                    if (user) {
                        console.log(user);
                        var name = petic.user._json.first_name;
                        var lastname = petic.user._json.last_name;
                        var url_foto = "http://graph.facebook.com/" + petic.user.id + "/picture";
                        resp.render('home/index', {
                            categories : petic.category,
                            user: true,
                            name: name + " " + lastname,
                            url_foto: url_foto,
                            questions : resp.questions
                        });

                    } else {
                        var user = new User({
                            first_name: petic.user.name.givenName,
                            last_name: petic.user.name.familyName,
                            displayName: petic.user.displayName,
                            password: petic.user.id,
                            url_foto: "http://graph.facebook.com/" + petic.user.id + "/picture"
                        })

                        user.save(function(err) {
                            if (err) {
                                console.log("Ya esta guardado esre");
                                console.log(user)
                                return;
                            }
                        });

                        var name = petic.user._json.first_name;
                        var lastname = petic.user._json.last_name;
                        var url_foto = "http://graph.facebook.com/" + petic.user.id + "/picture";
                        resp.render('home/index', {
                            categories : petic.category,
                            user: true,
                            name: name + " " + lastname,
                            url_foto: url_foto,
                            questions : resp.questions
                        });
                    }
                })
            } else
                resp.render('home/index', {
                    categories : petic.category,
                    questions : resp.questions
                })
        });

};

module.exports = homeController;
