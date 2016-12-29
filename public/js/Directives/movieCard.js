  var module = angular.module("Stream");
  
  module.directive('movieCard', function() {
  return {
    restrict: 'E',
    scope: {
      result: '='
    },
    templateUrl: 'public/HTML/Directives/movieCard.html',
    controller: 'MovieCardController'
  };
});