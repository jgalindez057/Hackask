var Question = require('../models/question');
var Answer = require('../models/answer');
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
            slug: slug(petic.body.title),
            category: petic.body.selectpicker
        });

        question.save (function(err) {
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
            .populate('category')
            .populate('user')
            .exec(function (err, question) {
                Answer
                    .find({
                        question: question
                    })
                    .populate('user')
                    .sort('-created')
                    .exec(function (err, answers) {
                        resp.render('discuss/question_answers', {
                            answers: answers,
                            question: question,
                            user: petic.user,
                            name: petic.name + " " + petic.lastname,
                            url_foto: petic.url_foto
                        });
                    })
            })
        });


    server.route('/category/question/:slug')

        .get(logged, function (petic, resp) {
            Question
                .findOne({
                    slug: petic.params.slug
                })
                .populate('category')
                .populate('user')
                .exec(function (err, question) {
                console.log(question)
                Answer
                    .find({
                        question: question
                    })
                    .populate('user')
                    .sort('-created')
                    .exec(function (err, answers) {
                        resp.render('discuss/question_answers', {
                            answers : answers,
                            question: question,
                            user: petic.user,
                            name: petic.name + " " + petic.lastname,
                            url_foto: petic.url_foto
                        });
                    })
            })
    });

    server.route('/save-answer/:slug')

        .post(loggedUser, getUser, function (petic, resp, next) {
        Question
            .findOne({
                slug: petic.params.slug
            })
            .populate('user')
            .exec(function(err, question) {
                var answer = new Answer({
                    user: petic.user,
                    question: question,
                    content: petic.body.content
                });
                answer.save(function(err) {
                    if (err) {
                        return next(err);
                        console.log('error al guardar la respuesta');

                    }

                    console.log('guardando respuesta');
                    question.answers.push(answer._id);
                    question.save(function (err, question) {
                        if (err) return next(err);
                        console.log(petic.params);

                        resp.redirect('/question/' + petic.params.slug);
                    });
                                
                });


            })
    })
}

module.exports = disscuss;
