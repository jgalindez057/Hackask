var mongoose = require('../connections/mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({  
    first_name: {
        type: String,
        required: true,
        sparse: true
    },
    last_name: {
        type: String,
        required: true,
        sparse: true
    },
    displayName: {
        type: String,
        required: true,
        unique: true,
        sparse: true
    },
    email: {
        type: String,
        unique : true,
        sparse: true
    },
    password: {
        type: String,
        required: true,
        unique : true,
        sparse: true
    }
});

var User = mongoose.model('user', userSchema);

module.exports = User;
