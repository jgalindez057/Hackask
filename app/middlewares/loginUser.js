var loggerUser = function (petic, resp, next){
	if (petic.user) {
		next();
	}else{
		resp.redirect('/login')
	}
}

module.exports = loggerUser;