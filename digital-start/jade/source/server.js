// Default modules
var express = require('express');
var path = require('path');

var router = express.Router();
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();

// Default configuration
app.set('port', process.env.PORT || 3042);
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(cookieParser());{"frontend"};
app.use(router);
app.use(express.static(path.join(__dirname, '../public')));
app.locals.pretty = false;

// Development configuration
// error handlers
// development error handler
// will print stacktrace
if ('development' === app.get('env')) {
  	app.use(function(err, req, res, next) {
	    res.status(err.status || 500);
	    res.render('error', {
	        message: err.message,
	        error: err
	    });
	});
  	app.locals.pretty = true;
}

// Routes
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});
app.get('/index.html', function(req, res) {
	res.render('index', {title: 'Express'});
});


// Initialization
app.listen(app.get('port'), function() {
  console.log('Frontend template is running on port ' + app.get('port'));
});