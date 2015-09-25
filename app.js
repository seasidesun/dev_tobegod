var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require('fs');

var config = require('./config');
var appRouter = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json({type: 'application/json'}));
app.use(bodyParser.text({type: 'application/xml'}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// create access,error stream
// var accessLogStream = fs.createWriteStream(__dirname + config.express.access_path, {flags: 'a'});
 
// log access 
// app.use(logger('combined', {stream: accessLogStream}));

appRouter(app);

app.set('port', config.express.port || 3000);

app.listen(app.get('port'), function() {
    console.log('Express server listening on port ' + config.express.port);
    console.log("Express env " + app.get('env'));
});

module.exports = app;
