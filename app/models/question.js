var mongoose = require('../connections/mongoose');
var Schema = mongoose.Schema;

var askSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'category'
    },
    title: {
        type: String,
        require: true
    },
    content: {
        type: String,
        require: true
    },
    slug: {
        type: String
    },
    created: {
        type: Date,
        default: Date.now
    },
    likes: {
        type: Number,
        default: 0
    },
    answers: [{
        type: Schema.Types.ObjectId,
        ref: 'answer'
    }]
});

var modelAsk = mongoose.model('question', askSchema);

module.exports = modelAsk;
