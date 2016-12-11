var passport = require('passport');

var usersCollection
require('./mongo.js')().then(function(res) {
    usersCollection = res.usersCollection;
});


var passportExport = function(app) {
    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser(function(user, done){
        done(null,user.email);
    });

    passport.deserializeUser(function(email, done){
        usersCollection.findOne({email: email}, function(err, user) {
            done(err, user);
        });
    });

    require('./strategies/local.strategy.js')();
}

module.exports = passportExport;