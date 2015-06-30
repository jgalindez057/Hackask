var mongoose = require('../connections/mongoose');
var Schema = mongoose.Schema;

var askSchema = new Schema({
    user: {
    	type : Schema.Types.ObjectId, ref : 'user'
    },
    title: {
        type: String,
        require: true
    },
    content: {
        type: String,
        require: true
    }
});

var modelAsk = mongoose.model('question', askSchema);

module.exports = modelAsk;