var express = require('express');
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;

var favoritesCollection
require('../config/mongo.js')().then(function(res) {
    favoritesCollection = res.favoritesCollection;
});

var favoritesRoute = express.Router();

favoritesRoute.route('/')
    .post(function (req, res) {
        if (!req.user) { 
            res.send('Got an INVALID POST request'); 
        } else {
            document = req.body;
            document.userid = req.user._id;
            favoritesCollection.findOne(document, function(err, documents) {
                if (err) {
                    res.send(null);
                } else if (documents) {
                    res.send('Got an INVALID POST request')
                } else {
                    favoritesCollection.insertOne(document);
                    res.send('Got a POST request')
                }
            })

        }
    })
    .get(function (req, res) {
        if (!req.user) { 
            res.send('Got an INVALID GET request'); 
        } else {
            favoritesCollection.find({userid: req.user._id}).toArray(function(err, documents) {
                if (err) {
                    res.send('Got an INVALID GET request'); 
                } else {
                    res.send({results: documents})
                }
            })
        }
    })

favoritesRoute.route('/:movieid')
    .get(function(req, res) {
        if (!req.user) { 
            res.send('Got an INVALID POST request'); 
        } else {
            var document = {
                id: parseInt(req.params.movieid),
                userid: req.user._id
            } 
            favoritesCollection.findOne(document, function(err, documents) {
                if (err) {
                    res.send(null);
                } else if (documents) {
                    res.json({isFavorite: true})
                } else {
                    res.json({isFavorite: false})
                }
            })
            //res.send('Got a POST request')
        }
        
    })
    .delete(function (req, res) {
        if (!req.user) { 
            res.send('Got an INVALID DELETE request'); 
        } else {
            var document = {
                userid: req.user._id,
                id: parseInt(req.params.movieid)
            }
            favoritesCollection.remove(document)
            res.send('Got a DELETE request')
        } 
    })

module.exports = favoritesRoute;