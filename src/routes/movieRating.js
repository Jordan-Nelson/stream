var express = require('express');
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;

var moviesCollection
require('../config/mongo.js')().then(function(res) {
    moviesCollection = res.moviesCollection;
});

var movieRatingRoute = express.Router();

// api post route
movieRatingRoute.route('/:movieid/:rating/:email')
.all(function(req, res, next) {
    if(!req.user) {
        // do nothing
    } else {
        next();
    }
})
.post(function (req, res) {
    res.send('Got a POST request');
    console.log('posting');
    var movieid = req.params.movieid;
    var rating = req.params.rating;
    var email = req.params.email;
    var post = {
                "movieid": movieid,
                "rating": rating,
                "email": email
                };
    moviesCollection.insertOne(post);
})


// api put route
movieRatingRoute.route('/:movieid/:rating/:email')
.all(function(req, res, next) {
    if(!req.user) {
        // do something to inform user that they are not logged in
    } else {
        next();
    }
})
.put(function (req, res) {
    res.send('Got a PUT request');
    console.log('puting');
    var movieid = req.params.movieid;
    var rating = req.params.rating;
    var email = req.params.email;
    var put = {
                "movieid": movieid,
                "rating": rating,
                "email": email
                };
    moviesCollection.findOneAndUpdate({movieid:movieid, email:email}, put)    
})

//api get route for average movie rating
movieRatingRoute.route('/:movieid')
.get(function (req, res) {
    var movieid = req.params.movieid;
    var query = moviesCollection.find({ movieid:movieid}).toArray(function(error, documents) {
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
.all(function(req, res, next) {
    if(!req.user) {
        // do something to inform user that they are not logged in
    } else {
        next();
    }
})
movieRatingRoute.route('/:movieid/:email')
.get(function (req, res) {
    var movieid = req.params.movieid;
    var email = req.params.email;
    moviesCollection.find({ movieid:movieid, email:email}).toArray(function(error, documents){
        if (typeof documents[0] === 'undefined') {
            res.send(null);
        } else {
            res.send(documents[0].rating);
        }
    });
})

module.exports = movieRatingRoute;
