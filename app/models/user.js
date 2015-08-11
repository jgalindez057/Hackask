var mongoose = require('../connections/mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({  
    displayName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique : true,
        sparse: true,
        validate: [/^[a-zA-Z0-9_\.\+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-\.]+$/]
    },
    password: {
        type: String,
        required: true,
        unique : true,
        sparse: true
    },
    confirmPassword: {
        type: String,
        required: true,
        unique : true,
        sparse: true
    },
    url_foto:{
        type: String
    },
    provider:{
        type: String
    }
});

userSchema.path('displayName').validate(function(u) {
  return u && u.length >= 3 && u && u.length <= 25;
}, 'El nombre del usuario de tener de 3 a 25 caracteres');

userSchema.path('password').validate(function(p) {
  return p && p.length >= 1 && p && p.length <= 25;
}, 'Su contraseña debe tener de 1 a 25 caracteres');

var User = mongoose.model('user', userSchema);

module.exports = User;
