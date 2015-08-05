var express = require('express'),
 swig = require('swig'),
 server = express(),
 session = require('express-session'),
 passport = require('passport'),
 cookieParser = require('cookie-parser'),
 bodyParser = require('body-parser'),
 globule = require('globule'),
 path = require('path'),
 rootPath = path.normalize(__dirname + '/.');



swig.setDefaults({
    cache: false
});

// Configuracion express
server.use(bodyParser.urlencoded({
    extended: true
}));
server.use(bodyParser.json());
server.use(cookieParser());
server.use(session({
    secret: 'mi clave',
    resave: true,
    saveUninitialized: true
}));


//Configurando passport
server.use(passport.initialize());
server.use(passport.session());

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

server.engine('html', swig.renderFile);
server.set('view engine', 'html');
server.set('views', __dirname + '/app/views');
server.use(express.static('./public'));

var filepaths = globule.find(rootPath + '/app/controllers/**/*.js');
	filepaths.forEach(function (controller){
		    require(controller)(server);
});

// Server para login de facebook
require('./app/connections/google')(server);
require('./app/connections/facebook')(server);
require('./app/connections/github')(server);
require('./app/connections/passport-local')(server);
require('./app/connections/passport-singup')(server);


// var filepaths2 = globule.find(rootPath + '/app/connections/**/*.js');
// 	filepaths2.forEach(function (controller2){
// 		    require(controller2)(server);
// });

server.listen(3000);