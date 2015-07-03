var Question = require('../models/question');

var getQuestion = function (petic, resp, next){
	Question.findOne({ slug: petic.params.slug}, function (err, question){
		if (question) {
			petic.question = question;
			next();
		}else{
			console.log(err);
			resp.redirect('/error question');
		}
	});
};

module.exports = getQuestion;