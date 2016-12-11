(function(){
  
  var tmdb = function($http){
    
    var movieSearch = function(query){
      return $http.get("https://api.themoviedb.org/3/search/movie?api_key=4b0d7d7a3b07fc8a84025f3e1edd7a0e&query=" + query)
        .then(function(response){
          return response.data;
        });
    };
    
    var movieSimilar = function(id){
      return $http.get("https://api.themoviedb.org/3/movie/" + id + "/similar?api_key=4b0d7d7a3b07fc8a84025f3e1edd7a0e")
        .then(function(response){
          return response.data;
        });
    };
    
    var moviePopular = function(){
      return $http.get("https://api.themoviedb.org/3/discover/movie?api_key=4b0d7d7a3b07fc8a84025f3e1edd7a0e&sort_by=popularity.desc&vote_count.gte=100")
        .then(function(response){
          return response.data;
        });
    }
    
    var moviegRated = function(){
      return $http.get("https://api.themoviedb.org/3/discover/movie?api_key=4b0d7d7a3b07fc8a84025f3e1edd7a0e&certification_country=US&certification.lte=G&sort_by=popularity.desc&vote_count.gte=100")
        .then(function(response){
          return response.data;
        });
    }
    
    var movieComedy = function(){
      return $http.get("https://api.themoviedb.org/3/discover/movie?api_key=4b0d7d7a3b07fc8a84025f3e1edd7a0e&with_genres=35&sort_by=popularity.desc&vote_count.gte=100")
        .then(function(response){
          return response.data;
        });
    }
    
    var movieTopRated = function(){
      return $http.get("https://api.themoviedb.org/3/discover/movie?api_key=4b0d7d7a3b07fc8a84025f3e1edd7a0e&sort_by=vote_average.desc&vote_count.gte=1000")
        .then(function(response){
          return response.data;
        });
    }
    
    var movieTop2016 = function(){
      return $http.get("https://api.themoviedb.org/3/discover/movie?api_key=4b0d7d7a3b07fc8a84025f3e1edd7a0e&sort_by=vote_average.desc&vote_count.gte=100&primary_release_year=2016")
        .then(function(response){
          return response.data;
        });
    }
    
    var movieSciFi = function(){
      return $http.get("https://api.themoviedb.org/3/discover/movie?api_key=4b0d7d7a3b07fc8a84025f3e1edd7a0e&with_genres=878&sort_by=vote_average.desc&vote_count.gte=1000")
        .then(function(response){
          return response.data;
        });
    }
    
    return {
      movieSearch: movieSearch,
      movieSimilar: movieSimilar,
      moviePopular: moviePopular,
      moviegRated: moviegRated,
      movieComedy: movieComedy,
      movieTopRated: movieTopRated,
      movieTop2016: movieTop2016,
      movieSciFi: movieSciFi
    };
    
  };
  
  var module = angular.module("Stream");
  module.factory("tmdb", tmdb);
  
}());