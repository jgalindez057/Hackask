var Question = require('../models/question'),
    Answer = require('../models/answer'),
    loginUser = require('../middlewares/loginUser'),
    loggedInformation = require('../middlewares/loggedInformation'),
    getUser = require('../middlewares/getuser'),
    async = require('async'),
    slug = require('slugs'),
    moment = require('moment');

var disscuss = function(server) {

    server.route('/save-question')

    .post(loginUser, getUser, function(petic, resp) {
        var question = new Question({
            user: petic.user,
            title: petic.body.title,
            content: petic.body.content,
            slug: slug(petic.body.title),
            category: petic.body.selectpicker
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

    .get(loggedInformation, function(petic, resp) {

        async.auto({
            question: function(callback) {
                Question
                    .findOne({slug: petic.params.slug})
                    .populate('user')
                    .exec(function(err, question) {
                        if (err) return console.log(err);
                        callback(null, question)
                    })
            },
            answer: ['question', function(callback, results) {
                Answer
                    .find({question: results.question})
                    .sort('-created')
                    .populate('user')
                    .exec(function (err, answer) {
                        if (err) return console.log(err);
                        callback(null, answer)
                    })
            }],

        }, function (err, results) {
            if (err) return (console.log(err));

            resp.render('discuss/question_answers', {
                moment: moment, 
                question: results.question,
                answers: results.answer,
                user: petic.user,
                name: petic.name,
                url_foto: petic.url_foto
            });
        })
    })


    server.route('/category/question/:slug')

    .get(loggedInformation, function(petic, resp) {

        async.auto({
            question: function(callback) {
                Question
                    .findOne({slug: petic.params.slug})
                    .populate('user')
                    .exec(function(err, question) {
                        if (err) return console.log(err);
                        callback(null, question)
                    })
            },
            answer: ['question', function(callback, results) {
                Answer
                    .find({question: results.question})
                    .sort('-created')
                    .populate('user')
                    .exec(function (err, answer) {
                        if (err) return console.log(err);
                        callback(null, answer)
                    })
            }],

        }, function (err, results) {
            if (err) return (console.log(err));

            resp.render('discuss/question_answers', {
                moment: moment, 
                question: results.question,
                answers: results.answer,
                user: petic.user,
                name: petic.name,
                url_foto: petic.url_foto
            });
        })
    })

    server.route('/save-answer/:slug')

    .post(loginUser, getUser, function(petic, resp, next) {
        Question
            .findOne({
                slug: petic.params.slug
            })
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
                    question.save(function(err, question) {
                        if (err) return next(err);
                        resp.redirect('/question/' + petic.params.slug);
                    });

                });


            })
    })
}

module.exports = disscuss;
