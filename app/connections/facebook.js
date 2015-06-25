var passport = require('passport');
var facebookStrategy = require('passport-facebook');

var facebookConnection = function (server){
	passport.use(new facebookStrategy({
		clientID : '120217034979599',
		clientSecret : '94484b9882e8dffe046d3522abb7edb2',
		callbackURL : 'http://localhost:3000/auth/facebook/app'
	},

	 function (accessToker, RefreshToken, profile, done){
	 	done(null, profile);
	 }));

	server.get('/auth/facebook', passport.authenticate('facebook'));

	server.get('/auth/facebook/app', passport.authenticate('facebook', { successRedirect : '/',
																failureRedirect : '/error'}));
}

module.exports = facebookConnection;