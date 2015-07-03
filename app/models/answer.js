var mongoose = require('../connections/mongoose');
var Schema = mongoose.Schema;

var answerSchema = new Schema({
	question:{
		type: Schema.Types.ObjectId, ref : 'question'
	},
	user:{
		type: Schema.Types.ObjectId, ref: 'user'
	},
	content:{
		type: String
	},
	date:{
		type: Date, default	: Date.now
	}
});

var answerModel = mongoose.model('answer', answerSchema);

module.exports = answerModel;