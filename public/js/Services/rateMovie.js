(function(){
  
  var rateMovie = function($http){
    
    var getAverageRating = function(movieID){
      return $http.get("/rating/" + movieID)
      .then(function(response){
          return response.data;                     
        });
    };

    var getUserRating = function(movieID, ip){
      return $http.get("/rating/" + movieID + '/' + ip)
      .then(function(response){
          return response.data;                     
        });
    };

    var rateMovie = function(movieID, rating, ip) {
        return getUserRating(movieID, ip).then(function(response){
            if (response == '') {
                postRating(movieID, rating, ip);
            } else {
                putRating(movieID, rating, ip);
            }
            return getAverageRating(movieID);
        });
    }
    
    var postRating = function(movieID, rating, ip){
        return $http.post("/rating/" + movieID + '/' + rating + '/' + ip)
        .then(function(response){
            return response.data;
        });
    };

    var putRating = function(movieID, rating, ip){
        return $http.put("/rating/" + movieID + '/' + rating + '/' + ip)
        .then(function(response){
            return response.data;
        });
    };
    
    return {
      getAverageRating: getAverageRating,
      getUserRating:getUserRating,
      rateMovie: rateMovie
    };
    
  };
  
  var module = angular.module("MovieDB");
  module.factory("rateMovie", rateMovie);
  
}());