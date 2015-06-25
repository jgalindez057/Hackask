var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/usersAuth');

module.exports = mongoose; 