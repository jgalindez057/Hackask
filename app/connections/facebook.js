	var passport = require('passport'),
	facebookStrategy = require('passport-facebook'),
	User = require('../models/user');

	var facebookConnection = function(server) {
		passport.use(new facebookStrategy({
				clientID: '120217034979599',
				clientSecret: '94484b9882e8dffe046d3522abb7edb2',
				callbackURL: 'http://localhost:3000/auth/facebook/app'
			},

			function(accessToker, RefreshToken, profile, done) {
				User.findOne({
					password: profile.id
				}, function(err, user) {
					if (err) {
						return done(err);
						console.log(err);
					};
					if (user) {
						console.log("Usuario de facebook ya registrado");
						done(null, user);
					} else {
						var newUser = new User();
						newUser.provider = profile.provider;
						newUser.password = profile.id;
						newUser.confirmPassword = profile.id;
						newUser.displayName = profile.displayName;
						newUser.url_foto = "http://graph.facebook.com/" + profile.id + "/picture";
						newUser.save(function(err, user) {
							if (err) {
								return done(err);
								console.log(err);
							};
							done(null, user);
						})
					}
				});
			}));

		server.get('/auth/facebook', passport.authenticate('facebook'));

		server.get('/auth/facebook/app', passport.authenticate('facebook', {
			successRedirect: '/',
			failureRedirect: '/error'
		}));
	}

	module.exports = facebookConnection;