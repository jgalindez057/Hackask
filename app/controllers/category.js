var Category = require('../models/category'),
    Question = require('../models/question'),
    async = require('async'),
    loggedInformation = require('../middlewares/loggedInformation');

var category = function(server) {
    server.route('/category/:slug')
        .get(loggedInformation, function(petic, resp) {

            async.auto({
                category: function(callback) {
                    Category
                        .findOne({
                            slug: petic.params.slug
                        })
                        .exec(function(err, category) {
                            if (err) return (console.log("Error en la categoria"));
                            callback(null, category)
                        })
                },
                question: ['category', function(callback, results) {
                    Question
                        .find({
                            category: results.category
                        })
                        .sort('-created')
                        .populate('category')
                        .populate('user')
                        .exec(function(err, question) {
                            if (err) return (console.log("Error en la pregunta"));
                            callback(null, question)
                        })
                }]
            }, function(err, results) {
                if (err) return (console.log(err));
                console.log(petic.user)
                resp.render('category/category_view', {
                    category: results.category,
                    questions: results.question,
                    user: petic.user,
                    name: petic.name,
                    url_foto: petic.url_foto
                });
            })

        })

}

module.exports = category;