var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var passtport = require('passport');
var session = require('express-session');

// main web app declaration 
var app = express(); 

// Define the port for main app
app.set('port', 8080);

// web app static file route for public folder
app.use('/public', express.static(path.join(__dirname + '/public')));

// body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

// passport middleware
app.use(cookieParser());
app.use(session({secret: 'lib'}));

require('./src/config/passport.js')(app);

// Web app default route
app.get('/', function (req, res) {
    res.sendfile('public/index.html');
})

// routes import
var movieRatingRoute = require('./src/routes/movieRating.js');
app.use('/rating', movieRatingRoute);
var authRouter = require('./src/routes/authRoutes.js');
app.use('/auth', authRouter);

// Listen for requests
var server = app.listen(app.get('port'), function() {
  var port = server.address().port;
  console.log('Listing on port ' + port);
});