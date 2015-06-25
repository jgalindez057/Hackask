var express = require('express');
var swig = require('swig');
var server = express();
var session = require('express-session');
var passport = require('passport');
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser');

swig.setDefaults({
    cache: false
})

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


// Configurando swig
server.engine('html', swig.renderFile);
server.set('view engine', 'html');
server.set('views', __dirname + '/app/views');
server.use(express.static('./public'));

// Server para los controladores
require('./app/controllers/home')(server);
require('./app/controllers/user')(server);

// Server para login de facebook
require('./app/connections/facebook')(server);


server.listen(3000);
