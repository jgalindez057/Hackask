var Question = require('../models/question');
var loggedUser = require('../middlewares/loginUser');
var logged = require('../middlewares/logged');
var getUser = require('../middlewares/getuser');
var slug = require('slugs');

var disscuss = function(server) {

    server.route('/save-question')

    .post(loggedUser, getUser, function (petic, resp) {
        var question = new Question({
            user: petic.user,
            title: petic.body.title,
            content: petic.body.content,
            slug: slug(petic.body.title)
        });

        question.save(function(err) {
            if (err) {
                console.log("error");
                console.log(petic.body);
                return;
            };
        });
        resp.redirect("/");
    });

    server.route('/question/:slug')

    .get(logged, function (petic, resp) {
        Question
            .findOne({
                slug: petic.params.slug
            })
            .populate('user')
            .exec(function(err, question) {
                if (err) {
                    console.log("error a traer la pregunta");
                    resp.redirect('/err');
                } else {
                    resp.render('discuss/answers', {
                        question: question,
                        user: petic.user,
                        name: petic.name + " " + petic.lastname,
                        url_foto: petic.url_foto
                    });
                }
            })
    })
}

module.exports = disscuss;
