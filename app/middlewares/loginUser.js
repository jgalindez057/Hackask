var loggerUser = function (petic, resp, next){
	if (petic.user) {
		next();
	}else{
		console.log('usuarion no autenticado')
		resp.redirect('/access');
	}
}

module.exports = loggerUser;