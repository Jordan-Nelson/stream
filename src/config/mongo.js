var MongoClient = require('mongodb').MongoClient;

module.exports = function() {
    // database declarations
    var mongoUri = 'mongodb://@localhost:27017/stream';
    var movieRating;
    var usersCollection;

    return MongoClient.connect(mongoUri).then(function(db) {
        console.log('initializing mongo collections');
        usersCollection = db.collection('users');
        moviesCollection = db.collection('movie-rating');
        sourcesCollection = db.collection('sources');
        favoritesCollection = db.collection('favorites')
        return {
            usersCollection: usersCollection,
            moviesCollection: moviesCollection,
            sourcesCollection: sourcesCollection,
            favoritesCollection: favoritesCollection
        }
    });

}