var express    = require('express');
var app        = express();
var path       = require('path')
var bodyParser = require('body-parser');
var morgan 	   = require('morgan');
var mongoose   = require('mongoose');
var jwt        = require('jsonwebtoken');
var multer     = require('multer');
var bcrypt     = require('bcrypt-nodejs');


var config     = require('./app/config');
var User       = require("./app/models/user");
var Ag         = require("./app/models/agro");

var AgRouter   = require('./app/routes/agro');
var UserRouter = require('./app/routes/user');

app.set('appSecret', config.secret);
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var port = process.env.PORT || 3000;

// Database connection
mongoose.connect( config.database , function(err, database){
	console.log("Connected to database successfully.");
});
app.use(morgan('dev'));

app.use('/', UserRouter);
app.use('/api', AgRouter);

// public files path
app.use(express.static(__dirname + '/public/app'));


//  Header configuration
app.use(function(req, res, next) { //allow cross origin requests
    res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
    res.header("Access-Control-Allow-Origin", "http://localhost");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// File Upload setting
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/app/uploads/')
  },
  filename: function (req, file, cb) {
    var filename = bcrypt.hashSync( file.originalname + '-' + Date.now() );
    cb(null, filename+path.extname(file.originalname));
  }
});

var upload = multer({ 
    storage: storage
}).single('file');

 app.post('/upload', function(req, res) {
    upload(req,res,function(err){
        if(err){
             res.json({status: false, message: err});
             return;
        }
         res.json({status: true, message: { filename: req.file.filename, filepath: "/uploads/"+req.file.filename }});
    })
});

// Angular App Route
app.get('/*', function(req, res){
	res.sendFile(__dirname + '/public/app/index.html')
});

app.listen(port, function(){
	console.log("Listening to port 3000");
});

console.log("connected..");
