var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');
var moment = require('moment');
var userSchema = Schema({
	email: {
    	type: String,
    	required: true,
    	unique: true
    },
	password: {
    	type: String,
    	required: true,
        select: false
    },
    name: String,
    location_lat: String,
    location_lan: String,
	is_admin: Boolean,
	created_at: String
});

userSchema.pre('save', function(next){
    var user = this;
    if(!user.isModified('password')) return next();
    bcrypt.hash(user.password, null, null, function(err, hash){
        if(err) return next(err);

        var now = moment(new Date());
        var date = now.format("D MMM, YYYY");

        user.created_at = date;
        user.password = hash;
        user.is_admin = false;
        next();
    });

});

userSchema.methods.comparePassword = function(password){
    var user = this;
    return bcrypt.compareSync(password, user.password);
};
module.exports = mongoose.model("User", userSchema);