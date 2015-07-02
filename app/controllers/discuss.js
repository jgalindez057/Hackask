var Question = require('../models/question');
var logged = require('../middlewares/logged');
var getUser = require('../middlewares/getuser');
var slug = require('slugs');

var disscuss = function(server) {

    server.route('/save-question')

    .post(logged, getUser, function(petic, resp) {
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
        resp.render('discuss/answers', {
            user: petic.user,
            name: petic.name + " " + petic.lastname,
            url_foto: petic.url_foto
        });
    })
}

module.exports = disscuss;
