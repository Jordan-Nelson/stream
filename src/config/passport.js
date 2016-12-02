var passport = require('passport');

var passportExport = function(app) {
    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser(function(user, done){
        done(null,user);
    });

    passport.deserializeUser(function(user, done){
        done(null,user);
    });

    require('./strategies/local.strategy.js')();
}

module.exports = passportExport;