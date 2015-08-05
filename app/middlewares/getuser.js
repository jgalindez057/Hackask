var User = require('../models/user');

var getUser = function (petic, resp, next){
	User.findOne({ password: petic.user.password}, function (err, user){
		if (user) {
			console.log('entro')
			petic.user = user;
			next();
		}else{
			console.log(err);
			resp.redirect('/err');
		}
	});
};

module.exports = getUser;