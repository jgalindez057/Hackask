var getQuestions = require('../middlewares/getquestions'),
    getCategories = require('../middlewares/getcategories'),
    topFive = require('../middlewares/top5'),
    moment = require('moment');


module.exports = function(server) {
    console.log("Home controller Funcionando");

    server.route("/")
        .get(getQuestions, getCategories, topFive, function (petic, resp) {
            if (petic.user) {
                resp.render('home/index', {
                    moment: moment,
                    fiveQuestions : petic.fiveQuestion,
                    categories: petic.category,
                    user: true,
                    name: petic.user.displayName,
                    url_foto: petic.user.url_foto,
                    questions: petic.questions
                 });
            } else
                resp.render('home/index', {
                    moment: moment,
                    fiveQuestions : petic.fiveQuestion,
                    categories: petic.category,
                    questions: petic.questions
                })
        });

};

