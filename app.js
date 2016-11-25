var express = require('express');
var path = require('path');
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;

// main web app declaration
var app = express();

// api declarations
var mongoUri = 'mongodb://@localhost:27017/stream';
//var mongoUri = 'mongodb://admin:pass1234@ds143717.mlab.com:43717/sampledb';
var movieDB;

// Define the port to run on
app.set('port', 8080);

// Web app default route
app.get('/', function (req, res) {
    res.sendfile('public/index.html');
})

// api post route
app.post('/rating/:movieid/:rating/:ip', function (req, res) {
    res.send('Got a POST request');
    console.log('posting');
    var movieid = req.params.movieid;
    var rating = req.params.rating;
    var ip = req.params.ip;
    var post = {
                "movieid": movieid,
                "rating": rating,
                "ip": ip
                };
    movieDB.insertOne(post);
})

// api put route
app.put('/rating/:movieid/:rating/:ip', function (req, res) {
    res.send('Got a PUT request');
    console.log('puting');
    var movieid = req.params.movieid;
    var rating = req.params.rating;
    var ip = req.params.ip;
    var put = {
                "movieid": movieid,
                "rating": rating,
                "ip": ip
                };
    movieDB.findOneAndUpdate({movieid:movieid, ip:ip}, put)    
})

//api get route for average movie rating
app.get('/rating/:movieid', function (req, res) {
    var movieid = req.params.movieid;
    var query = movieDB.find({ movieid:movieid}).toArray(function(error, documents) {
        if (error) throw error;
        var totalRating = 0;
        for (var i = 0; i < documents.length; i++) {
            totalRating += parseInt(documents[i].rating)
        }
        var avgRating = totalRating / documents.length; 
        res.send(avgRating.toString());
    });

})

//api get route for USER movie rating
app.get('/rating/:movieid/:ip', function (req, res) {
    var movieid = req.params.movieid;
    var ip = req.params.ip;
    movieDB.find({ movieid:movieid, ip:ip}).toArray(function(error, documents){
        if (typeof documents[0] === 'undefined') {
            res.send(null);
        } else {
            res.send(documents[0].rating);
        }
    });
})

// web app static file route for public folder
app.use('/public', express.static(path.join(__dirname + '/public')));

// Listen for requests
var server = app.listen(app.get('port'), function() {
  var port = server.address().port;
  console.log('Listing on port ' + port);
});

MongoClient.connect(mongoUri).then(function(db) {
    console.log('Connected to mongo DB');
    movieDB = db.collection('movie-rating');
});