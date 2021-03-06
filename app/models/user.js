var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

//define the schema for our user model
var userSchema = mongoose.Schema({

	local 			: {
		email 		: String,
		password 	: String,
	},
	facebook		: {
		id 			: String,
		token       : String,
		email 		: String,
		name 		: String
	},
	google 			:{
		id 			: String,
		token 		: String,
		email 		: String,
		name 		: String
	},
	twitter 		:{
		id 			: String,
		token 		: String,
		displayName : String,
		username 	:String
	}
});

//methods
userSchema.methods.generateHash = function(password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};
//password validation
userSchema.methods.validPassword = function(password) {
	return bcrypt.compareSync(password, this.local.password);
};
//create the model for users and expose it to app
module.exports = mongoose.model('User', userSchema);