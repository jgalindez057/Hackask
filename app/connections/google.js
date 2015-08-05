var passport = require('passport'),
	GoogleStrategy = require('passport-google-oauth').OAuth2Strategy,
	User = require('../models/user');

var googleLogin = function (server){

passport.use(new GoogleStrategy({

        clientID : '1078982885628-hpe440dgfvo3n5ndup1qp8vepggj334l.apps.googleusercontent.com',
        clientSecret : 'Tg5eUpBvVCJBvAhOclbXAuTP',
        callbackURL : "http://localhost:3000/auth/google/app"
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOne({ password: profile.id}, 
      function(err, user){
        if (err) {
          return done(err);
          console.log(err)
        };
        if (user) {
          console.log("Usuario de google ya registrado");
          done(null, user);
        }else{
          var newUser = new User();
          newUser.provider = profile.provider;
          newUser.password = profile.id;
          newUser.confirmPassword = profile.id;
          newUser.displayName = profile.displayName;
          newUser.url_foto = profile.photos[0].value;
          newUser.save(function(err, user){
              if (err) {
                return done(err);
                console.log(err);
              };
              done(null, user);
          })
        }
    })
  }));

	server.get('/auth/google', passport.authenticate('google', { scope: 'https://www.googleapis.com/auth/plus.login' }));

	server.get('/auth/google/app', passport.authenticate('google', { successRedirect : '/',
																failureRedirect : '/error'}));
}

module.exports = googleLogin;