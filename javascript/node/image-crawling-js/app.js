var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

/**/
var Xray = require('x-ray');
var fs = require("fs");
/**/


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/************* Custom Code  *************/


app.get('/', function (req, res) {
  res.sendfile(__dirname + '/views/test.html');
});


app.get('/getImg', function(req,res){
	var xray = new Xray();

	xray('http://hn-hn.co.kr/','img',
		[{
			img:'@src',
			class:'@class',
			width:'@width',
			height:'@height'
		}]
	)
	(function(err, results){
		// var download = new Download();
		var filtered = [];
		results = results.filter(function(image){
			if(image.class === 'MS_prod_img_m'){
				filtered.push(image);
			}
			return image.class === 'MS_prod_img_m';
		})
		fs.writeFile('./public/results.json',JSON.stringify(filtered, null, '\t'));
	})

  res.sendfile(__dirname + '/views/test.html');

})





// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
