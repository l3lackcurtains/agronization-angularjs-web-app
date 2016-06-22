var express    = require('express');
var app        = express();
var jwt        = require('jsonwebtoken');
var User       = require("../models/user");
var config     = require('../config');

var router = express.Router();
app.set('appSecret', config.secret);

// Create Token
function createToken(user){
	var token = jwt.sign({
		id: user._id,
		name: user.name,
		email: user.email
	}, app.get('appSecret') , {} );
	return token;
}
router.post('/signup', function(req, res){
	var user = new User({
		email: req.body.email,
		password: req.body.password,
		name: req.body.name
	});
	var token = createToken(user);
	user.save(function(err){
		if(err){
			res.send(err);
			return;
		}
		res.json({status: true, message: "User has been Created.", token: token});
	});
});

router.post('/signin', function(req, res){
	User.findOne( {email: req.body.email }).select('name email password').exec(function(err, user){
		if(err) throw err;
		if(!user){
			res.send({message: "User doesn't exists"});
		}else if(user){
			var validPassword = user.comparePassword(req.body.password);
			if(!validPassword) {
				res.send({status: false, message: "Invalid Password"});
			} else{
				// Create a token
				var token = createToken(user);
				res.json({
					status: true,
					message: "successfully logged in.",
					token: token
				});

			}
		}
	});
});

module.exports = router;
