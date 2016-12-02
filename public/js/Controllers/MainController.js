(function() {

  var app = angular.module("Stream");

  var MainController = function($scope, $location, $routeParams, tmdb, auth) {

    $scope.search = function(query) {

        $location.path("/search/" + query);
      
    };
    
    tmdb.moviePopular().then(function(data){
      $scope.popular = data;
    });
    
    tmdb.moviegRated().then(function(data){
      $scope.gRated = data;
    });
    
    tmdb.movieComedy().then(function(data){
      $scope.comedy = data;
    });
    
    tmdb.movieTopRated().then(function(data){
      $scope.topRated = data;
    });
    tmdb.movieTop2016().then(function(data){
      $scope.top2016 = data;
    });
    tmdb.movieSciFi().then(function(data){
      $scope.sciFi = data;
    });

  };

  app.controller("MainController", MainController);

}());