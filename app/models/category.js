var mongoose = require('../connections/mongoose');
var Schema = mongoose.Schema;

var categorySchema = new Schema({
	nameCategory:{
		type: String
	},
	photoCategory:{
		type: String
	},
	contentCategory:{
		type:String
	}
});

var categoryModel = mongoose.model('category', categorySchema);

module.exports = categoryModel;

