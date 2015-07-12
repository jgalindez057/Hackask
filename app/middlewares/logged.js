var loggerUser = function (petic, resp, next){
	if (petic.user) {
		if (petic.user.provider === 'facebook') {
			var name = petic.user._json.first_name;
			var lastname = petic.user._json.last_name;
			var url_foto = "http://graph.facebook.com/" + petic.user.id + "/picture";
			petic.user = true;
			petic.name = name;
			petic.lastname = lastname;
			petic.url_foto = url_foto;
			next();
		} else {
			name = petic.user.first_name;
			lastname = petic.user.last_name;
			url_foto = petic.user.url_foto;
			petic.user = true;
			petic.name = name;
			petic.lastname = lastname;
			petic.url_foto = url_foto;
			next();
		}
	}else{
		console.log('No hay usuario autenticado');
		petic.user = false;
		next();
	}
};;

module.exports = loggerUser;