var Questions = require('../models/question'),
	User = require('../models/user'),
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
    		};
    		var userS = [];
    		results.forEach(function(questions){
    				User.findOne({ _id : questions.user}, function(err, user){
    					userS.push(user)
    			});
    		});
    		console.log(userS)
    	resp.render('discuss/search',{
     		questions: results,
     		moment: moment
     	})
    	});
	})
}	

