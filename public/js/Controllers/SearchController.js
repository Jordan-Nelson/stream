(function() {

  var app = angular.module("MovieDB");

  var SearchController = function($scope, $location, tmdb, guidebox, rateMovie, getIP, $routeParams) {

    $scope.movieSearch = function(newQuery) {
      tmdb.movieSearch(newQuery.replace("%20", " ")).then(processSearch, onError);
    };

    $scope.findSimilarMovies = function(id) {
        $location.path("/similar/" + id);
    };

    $scope.clientIP;
    var setIP = function() {
      getIP.getIP().then(function(data) {
        $scope.clientIP = data.ip;
      }, onError);
    }
    

    var getAverageRating = function(result, id) {
      rateMovie.getAverageRating(id).then(function(data) {
        if(data !== 'NaN'){
          result.rateMovie_averageRating = data; 
        }
      }, onError);
    }

    $scope.rateMovie = function(result, rating, ip) {
      rateMovie.rateMovie(result.id, rating, ip).then(function(data) {
        if(data !== 'NaN'){
          result.rateMovie_averageRating = data; 
        }
      }, onError);
          
    }

    $scope.movieSimilar = function() {
      tmdb.movieSimilar($routeParams.id).then(processSearch, onError);
    };
    
    $scope.movieCollage = function(data) {
      processSearch(data);
    }

    var processSearch = function(data) {
      $scope.resp = data;
      $scope.results = data.results;
      for (i = 0; i < $scope.results.length; i += 1) {
        getSources(i, $scope.results[i].id);
        getAverageRating($scope.results[i], $scope.results[i].id);
      };
    };

    var getSources = function(row, tmdbID) {
      guidebox.getSources(tmdbID).then(function(data) {
        if (data.id) {
          $scope.results[row].guideBoxId = data.id;
          setSources(row, data.id);
        }
      }, onError);
    };

    var setSources = function(row, guideBoxId) {
      guidebox.setSources(guideBoxId).then(function(data) {
        if (data) {
          $scope.results[row].sources = data;
        }
      }, onError);
    };

    var onError = function(reason) {
      console.log("Error receiving results");
    };
    
    $scope.allSources = ['amazon_prime', 'netflix', 'hulu_plus', 'hbo_now', 'fandor', 'shudder', 'showtime_subscription', 'amazon_buy', 'itunes', 'google_play', 'vudu', 'youtube_purchase', 'cinemanow']
    
    $scope.greaterThan = function(prop, val){
    return function(item){
      return item[prop] > val;
    }
}

    
    if ($location.url().substring(0,8) === "/search/") {
      $scope.movieSearch($routeParams.query);
    } else if ($location.url().substring(0,9) === "/similar/") {
      $scope.movieSimilar($routeParams.id);
    } else if ($location.url().substring(0,15) === "/mobile/search/") {
      $scope.movieSearch($routeParams.query);
    } else if ($location.url().substring(0,16) === "/mobile/similar/") {
      $scope.movieSimilar($routeParams.id);
    } else if ($location.url() === "/category/popular") {
      $scope.movieCollage($scope.popular);
    } else if ($location.url() === "/category/G-rated") {
      $scope.movieCollage($scope.gRated);
    } else if ($location.url() === "/category/comedy") {
      $scope.movieCollage($scope.comedy);
    } else if ($location.url() === "/category/Top-rated") {
      $scope.movieCollage($scope.topRated);
    } else if ($location.url() === "/category/Top-2016") {
      $scope.movieCollage($scope.top2016);
    } else if ($location.url() === "/category/Sci-fi") {
      $scope.movieCollage($scope.sciFi);
    };
    
    window.scrollTo(0, 0);
    setIP();
    console.log($scope.clientIP)
    $(".loading").fadeOut(3000);

  };

  app.controller("SearchController", SearchController);



}());