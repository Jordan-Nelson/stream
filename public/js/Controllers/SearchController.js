(function() {

  var app = angular.module("Stream");

  var SearchController = function($scope, $location, tmdb, guidebox, getIP, $routeParams) {

    $scope.movieSearch = function(newQuery) {
      document.activeElement.blur();
      document.getElementById('search-results').focus()
      tmdb.movieSearch(newQuery.replace("%20", " ")).then(processSearch, onError);
    };

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
        
    $scope.greaterThan = function(prop, val){
      return function(item) {
        return item[prop] > val;
      };
    };

    
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
    $(".loading").fadeOut(2000);

  };

  app.controller("SearchController", SearchController);

}());