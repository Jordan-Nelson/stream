var passport = require('passport');
var LocalStrategy = require('passport-Local').Strategy;
var MongoClient = require('mongodb').MongoClient;
var auth = require('passport-local-authenticate');

var usersCollection
require('../mongo.js')().then(function(res) {
    usersCollection = res.usersCollection;
});

module.exports = function () {
    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    },
    function(email, password, done){
        usersCollection.findOne({email: email.toLowerCase()},
        function(err, results){
            if (results) {
                auth.hash(password, function(err, hashed) {
                    auth.verify(password, {hash: results.hash, salt: results.salt}, function(err, verified) {
                        if (err) {
                            console.log(err)
                        }
                        if (verified) {
                            var user = results;
                            done(null, user);
                        }
                        else {
                            done(null, false, {message: 'Invalid Password'})
                        }
                    });
                });
            } else {
                done(null, false, {message: 'Invalid Password'})
            }
        })
    }
    ));
}