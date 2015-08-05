var passport = require('passport'),
	GitHubStrategy = require('passport-github2').Strategy,
	User = require('../models/user');

var githubLogin = function(server){

	passport.use(new GitHubStrategy({
    clientID: '5d9ee678f7820230b937',
    clientSecret: 'c909c435d94fc0831436178e4a2f4fb898f52d06',
    callbackURL: "http://localhost:3000/auth/github/app"
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOne({ password : profile.id }, function (err, user) {
    	if (err) {
    		console.log(err);
    		return done(err);
    	};

    	if (user) {
    		console.log('Usuario ya registrado');
    		done(null, user);
    	}else{
    		var newUser = new User();
          newUser.provider = profile.provider;
          newUser.password = profile.id;
          newUser.confirmPassword = profile.id;
          newUser.displayName = profile.displayName;
      	  newUser.url_foto = profile._json.avatar_url;
          newUser.save(function(err, user){
              if (err) {
                return done(err);
                console.log(err);
              };
              done(null, user);
          })
    	}
    });
  }
));

	server.get('/auth/github', passport.authenticate('github', { scope: [ 'user:email' ] }));

	server.get('/auth/github/app', passport.authenticate('github', { successRedirect : '/',
																failureRedirect : '/error'}));
}

module.exports = githubLogin;