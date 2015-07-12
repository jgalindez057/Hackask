var User = require('../models/user');
var getQuestions = require('../middlewares/getquestions');
var getCategories = require('../middlewares/getcategories');

var homeController = function(server) {
    console.log("Home controller Funcionando");

    server.route("/")
        .get(getQuestions, getCategories, function (petic, resp) {
            if (petic.user) {
                if (petic.user.provider === 'facebook') {
                    console.log("usuario de facebook");
                    ;
                    User.findOne({
                        password: petic.user.id
                    }, function (err, user) {
                        if (user) {
                            var name = petic.user._json.first_name;
                            var lastname = petic.user._json.last_name;
                            var url_foto = "http://graph.facebook.com/" + petic.user.id + "/picture";
                            resp.render('home/index', {
                                categories: petic.category,
                                user: true,
                                name: name + " " + lastname,
                                url_foto: url_foto,
                                questions: petic.questions
                            });

                        } else {
                            var user = new User({
                                first_name: petic.user.name.givenName,
                                last_name: petic.user.name.familyName,
                                displayName: petic.user.displayName,
                                password: petic.user.id,
                                url_foto: "http://graph.facebook.com/" + petic.user.id + "/picture"
                            });
                            ;

                            user.save(function (err) {
                                if (err) {
                                    console.log("Ya esta guardado esre");
                                    console.log(user);
                                    ;

                                }
                            });

                            var name = petic.user._json.first_name;
                            var lastname = petic.user._json.last_name;
                            var url_foto = "http://graph.facebook.com/" + petic.user.id + "/picture";
                            resp.render('home/index', {
                                categories: petic.category,
                                user: true,
                                name: name + " " + lastname,
                                url_foto: url_foto,
                                questions: petic.questions
                            });
                        }
                    })
                } else {
                    resp.render('home/index', {
                        user: true,
                        url_foto: petic.user.url_foto,
                        name: petic.user.displayName,
                        categories: petic.category,
                        questions: petic.questions
                    });
                }
            } else
                resp.render('home/index', {
                    categories: petic.category,
                    questions: petic.questions
                })
        });

};

module.exports = homeController;
