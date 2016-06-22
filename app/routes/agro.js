var express    = require('express');
var app        = express();
var jwt        = require('jsonwebtoken');
var router 	   = express.Router();
var config     = require('../config');
var User       = require("../models/user");
var Agro         = require("../models/agro");

app.set('appSecret', config.secret);

// Get All Agro data
router.route('/agro')
.get(function(req, res){
	Agro.find(function(err, data){
		if(err){
			res.send({status: false, message: err});
		}
		res.json({status: true, message: data});
	})
});
// Get Single Agro data
router.route('/agro/:id')
.get(function(req, res){
	Agro.findById(req.params.id, function(err, data){
		if(err){
			 res.send({status: false, message: err});
		}
		res.json({status: true, message: data});
	});
});

// Get Searched Agro Data
router.route('/agros/:query')
.get(function(req, res){
	Agro.find({ $text: { $search: req.params.query } }, function(err, data) {
        if (err) return res.status(500).json({status: false, error: "Error fetching data", message: err});
        if(data.length != 0 ){
	        res.json({status: true, message: data});
	    }else{
	    	res.json({status: false, message: "Error to get search data '"+req.params.query+"' "});
	    }
    });
});

//middleware defination
router.use(function(req, res, next){
	var token = req.body.token || req.param('token') || req.headers['x-access-token'];
	//Check if token exists
	if(token){
		jwt.verify(token, app.get('appSecret'), function(err, decoded){
			if(err){
				res.status(403).send({success: false, message: "Authentication failed."});
			} else{
				req.decoded = decoded;
				next();
			}
		});
	} else{
		res.status(403).send({success: false, message: "No token provided."});
	}
});

router.get('/', function(req, res){
	res.json({status: true, message: "You can get Agriculture data from this API."});
});

router.route('/agro')
.post(function(req, res){
	var agro = new Agro(req.body);

	agro.save(function(err, data){
		if(err){
			res.send(err);
		}
		res.json(data);
	});
});


// Single Route
router.route('/agro/:id')
.put(function(req, res){
	Agro.findById(req.params.id, function(err, data){
		if(err){
			res.send(err);
		}
		data.org_name = req.body.org_name;
		data.org_desc = req.body.org_desc;
		data.org_type = req.body.org_type;
		data.org_location = req.body.org_location;
		data.org_location_lat = req.body.org_location_lat;
		data.org_location_lan = req.body.org_location_lan;
		data.org_phone_number = req.body.org_phone_number;
		data.org_email = req.body.org_email;
		data.org_website = req.body.org_website;
		data.org_image = req.body.org_image;

		data.save(function(err, data){
			if(err){
				res.send(err);
			}
			res.json(data);
		});
	});
})
.delete(function(req, res){
	Agro.remove({
		_id: req.params.id
	}, function(err, data){
		if(err){
			res.send(err);
		}
		res.json({status: true, message: "Data Deleted"});
	});
});

// View All Users
router.get('/users', function(req, res){
	User.find({}, function(err, users){
		if(err){
			res.send(err);
			return;
		}
		res.json(users);
	});
});

router.get('/me', function(req, res){
	res.json(req.decoded);
});

module.exports = router;
