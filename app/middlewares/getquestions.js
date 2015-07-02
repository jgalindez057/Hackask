var Question = require('../models/question');

var getQuestions = function (petic, resp, next){
	Question
	.find({})
	.populate('user')
	.sort('-created')
	.exec(function (err, questions){
		if (err) {
			console.log(err)
		};
		resp.questions = questions;
		next();
	});
};

module.exports = getQuestions;