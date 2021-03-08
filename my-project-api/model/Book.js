const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
	bookID : {
		type : Number,
		
	},
	cover : {
		type : String
	},
	title : {
		type : String,
		required : true
	},
	author : {
		type : String,
		required : true
	},
	category : {
		type : String
	},
	borrowedStatus : {
		type : String,
		default : "stock"
	},
	borrowedBy : [{type : mongoose.Schema.Types.ObjectId, ref: 'User'}],
	avgRating : {
		type : Number
	},
	borrowedDate : {
		type : Date
	},
	returnDate : {
		type : Date
	}
});




module.exports = mongoose.model('Book',BookSchema);





