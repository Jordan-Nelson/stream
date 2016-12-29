var express = require('express');
var authRouter = express.Router();
var MongoClient = require('mongodb').MongoClient;
var passport = require('passport');
var auth = require('passport-local-authenticate');

var usersCollection
require('../config/mongo.js')().then(function(res) {
    usersCollection = res.usersCollection;
});

authRouter.route('/signup')
    .post(function(req, res) {
        var user;
        auth.hash(req.body.password.toLowerCase(), function(err, hashed) {
            user = {
                email: req.body.email.toLowerCase(),
                salt: hashed.salt,
                hash: hashed.hash
            };
            usersCollection.findOne({email: user.email},
            function(err, results){
                if (results) {
                    return res.json({success: false});
                } else {
                    usersCollection.insert(user, function(err, results){ 
                        req.login(results.ops[0], function(){
                        return res.json({success: true});
                        });
                    });
                }
            })
        });
    });

authRouter.get('/signin', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) { return next(err); }
    if (!user) { 
        return res.json({success: false});
    }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      return res.json({success: true});
    });
  })(req, res, next);
  //console.log(res.user)
});

authRouter.route('/user')
    .get(function(req, res){
        //console.log(req.user)
        res.json(req.user);
    });

authRouter.route('/logout')
    .get(function(req, res){
        req.logout();
        res.redirect('/');
    });


module.exports = authRouter;