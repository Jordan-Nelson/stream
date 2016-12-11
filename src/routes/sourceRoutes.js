var express = require('express');
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var request = require('request');
var requestPromise = require('request-promise');

var sourcesCollection
require('../config/mongo.js')().then(function(res) {
    sourcesCollection = res.sourcesCollection;
});

var sourceRoute = express.Router();

var getGuideboxSources = function(tmdbID) {

    return requestPromise({
        uri: "https://api-public.guidebox.com/v1.43/US/rKVvk6b7F2r23KAhseugCCIB47sTI7Tp/search/movie/id/themoviedb/" + tmdbID,
        method: "GET"
    })
    .then(function(body) {
            body = JSON.parse(body);
            if (!body) { 
                return null;
            } else {
                var fullUrl = 'https://api-public.guidebox.com/v1.43/US/rKVvk6b7F2r23KAhseugCCIB47sTI7Tp/movie/' + body.id
                return requestPromise({
                    url: fullUrl,
                    method: "GET"
                })
                .then(function(body) {
                    body = JSON.parse(body);
                    return body;
                })
                .catch(function(reason){
                    console.log(reason)
                })
        }
    })
    .catch(function(reason) {
        console.log(reason)
    })
}

// api post route
sourceRoute.route('/:movieid')
    .get(function(req,res) {
        sourcesCollection.findOne({movieid: req.params.movieid}, function(err, doc) {
            if (err) {
                console.log('error fetching data');
                res.send(null);
            } else if (doc === null) {
                getGuideboxSources(req.params.movieid).then(function(response) {
                    var document = {
                        movieid: req.params.movieid,
                        guideboxData: response,
                        timeposted:  Date()
                    };
                    sourcesCollection.insert(document)
                    res.send(response)
                })
            } else {
                var currentTime = new Date();
                var timePosted = new Date(doc.timeposted);
                var daysOld = ( currentTime.getTime() - timePosted.getTime()) / (1000 * 60 * 60 * 24);
                if (daysOld < 1 ) {
                    res.send(doc.guideboxData);
                }  else {
                    getGuideboxSources(req.params.movieid).then(function(response) {
                        var document = {
                            movieid: req.params.movieid,
                            guideboxData: response,
                            timeposted:  Date()
                        };
                        sourcesCollection.findOneAndUpdate({movieid: req.params.movieid}, document);
                        res.send(response)
                    })
                }
            }
        })
    })

module.exports = sourceRoute;