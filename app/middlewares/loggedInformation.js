var loggedInformation = function (petic, resp, next){
	if (petic.user) {
		console.log(petic.user)
			var name = petic.user.displayName
		if (petic.user.provider == 'facebook') {
				var url_foto = petic.user.url_foto;
			petic.user = true;
			petic.name = name;
			petic.url_foto = url_foto;
			next();
		} else if (petic.user.provider == 'google' && petic.user.provider == 'github'){
				var url_foto = petic.user.url_foto;
			petic.user = true;
			petic.name = name;
			petic.url_foto = url_foto;
			next();			
		} else {
			var url_foto = petic.user.url_foto;
			petic.user = true;
			petic.name = name;
			petic.url_foto = url_foto;
			next();
		}
	}else{
		console.log('No hay usuario autenticado');
		petic.user = false;
		next();
	}
};;

module.exports = loggedInformation;