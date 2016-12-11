(function(){
  
  var favorites = function($http){
    
    var isFavorite = function(movieid){
      return $http.get('/favorites/' + movieid)
      .then(function(response){
          return response.data;                     
        });
    };

    var getFavorites = function(){
      return $http.get('/favorites')
      .then(function(response){
          return response.data;                     
        });
    };
    
    var postFavorite = function(movie){
        return $http.post('/favorites', movie)
        .then(function(response){
            return response.data;
        });
    };

    var deleteFavorite = function(movie){
        return $http.delete('/favorites/' + movie.id)
        .then(function(response){
            return response.data;
        });
    };
    
    return {
      isFavorite: isFavorite,
      postFavorite: postFavorite,
      deleteFavorite: deleteFavorite,
      getFavorites: getFavorites
    };
    
  };
  
  var module = angular.module("Stream");
  module.factory("favorites", favorites);
  
}());