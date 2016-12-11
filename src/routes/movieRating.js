var express = require('express');
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;

var moviesCollection
require('../config/mongo.js')().then(function(res) {
    moviesCollection = res.moviesCollection;
});

var movieRatingRoute = express.Router();

movieRatingRoute.route('/')
    .post(function (req, res) {
        if (!req.user) { 
            res.send('Got an INVALID POST request'); 
        } else {
            document = req.body;
            document.email = req.user.email;
            if (document.rating >= 1 && document.rating <= 5) {
                res.send('Got a POST request');
                moviesCollection.insertOne(document);
            } else {
                res.send('Got an INVALID POST request');
            }
        }
    })
    .put(function (req, res) {
        if (!req.user) { 
            res.send('Got an INVALID PUT request'); 
        } else {
            document = req.body;
            document.email = req.user.email;
            if (document.rating >= 1 && document.rating <= 5) {
                res.send('Got a POST request');
                moviesCollection.findOneAndUpdate({movieid: document.movieid, email: document.email}, document) 
            } else {
                res.send('Got an INVALID POST request');
            }
        } 
    });

movieRatingRoute.route('/user/:movieid')
    .get(function (req, res) {
        if (!req.user) { 
            res.send('Got an INVALID GET request'); 
        } else {
            document = {
                movieid: parseInt(req.params.movieid),
                email: req.user.email
            } 
            moviesCollection.findOne(document, function(error, documents){
                res.send(documents);
            });
        }
    })

movieRatingRoute.route('/average/:movieid')
    .get(function (req, res) {
        document = {
            movieid: parseInt(req.params.movieid)
        }
        moviesCollection.find({ movieid: document.movieid}).toArray(function(error, documents) {
            if (error) { 
                throw error;
            } else {
                var totalRating = 0;
                for (var i = 0; i < documents.length; i++) {
                    totalRating += documents[i].rating
                }
                var avgRating = totalRating / documents.length; 
                res.send(avgRating.toString());
            }
        });
    })

module.exports = movieRatingRoute;