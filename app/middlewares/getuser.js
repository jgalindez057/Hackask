var User = require('../models/user');

var getUser = function (petic, resp, next){
	User.findOne({ displayName : petic.user.displayName}, function (err, user){
		if (user) {
			petic.user = user;
			next();
		}else{
			resp.reditect('/error');
		}
	});
};

module.exports = getUser;