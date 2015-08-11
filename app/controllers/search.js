var Questions = require('../models/question'),
	User = require('../models/user'),
    async = require('async'),
	moment = require('moment');

module.exports = function(server) {
	server.route('/search')
	.post(function (petic, resp){
		Questions
		.aggregate([
			{$match: {$text: {$search: petic.body.search}}}, 
			{$project: {title:1, content:1, user:1, answer:1, category:1, created:1, _id:0}}
		])
    	.exec(function(err, results){
    		if (err) {
    			console.log(err)
                return next(err);
    		};
            async.map(results, function (question, callback) {
                question.populate('user', callback);
            }, function (err, results) {
                resp.render('discuss/search',{
                    questions: results,
                    moment: moment
                })
            })
    		    	
    	});
	})
}	

