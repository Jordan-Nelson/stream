(function(){
  
  var rateMovie = function($http){
    
    var getAverageRating = function(movieid){
      return $http.get('/rating/average/' + movieid)
      .then(function(response){
          return response.data;                     
        });
    };

    var getUserRating = function(movieid){
        return $http.get('/rating/user/' + movieid)
        .then(function(response){
            return response.data;                     
        });
    };

    var rateMovie = function(movieid, rating) {

        return getUserRating(movieid).then(function(response){
            if (response == '') {
                postRating(movieid, rating);
            } else {
                putRating(movieid, rating);
            }
            return getAverageRating(movieid);
        });

    }
    
    var postRating = function(movieid, rating){
        body = {
            movieid: movieid,
            rating: rating
        }
        return $http.post('/rating', body)
        .then(function(response){
            return response.data;
        });
    };

    var putRating = function(movieid, rating){
        body = {
            movieid: movieid,
            rating: rating
        }
        return $http.put('/rating', body)
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
  
  var module = angular.module("Stream");
  module.factory("rateMovie", rateMovie);
  
}());