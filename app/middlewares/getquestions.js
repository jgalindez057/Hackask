var Question = require('../models/question');

var getQuestions = function (petic, resp, next){
	Question
	.find({})
	.populate('user')
	.populate('category')
	.populate('answers')
	.sort('-created')
	.exec(function (err, questions){
		if (err) {
			console.log(err)
		};
		petic.questions = questions;
		next();
	});
};

module.exports = getQuestions;