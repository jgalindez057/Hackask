var User = require('../models/user');

var getUser = function (petic, resp, next){
	User.findOne({ displayName : petic.user.displayName}, function (err, user){
		if (user) {
			petic.user = user;
			next();
		}else{
			console.log(err);
			resp.redirect('/error user');
		}
	});
};

module.exports = getUser;