var module = angular.module("Stream");

module.directive('searchBar', function() {
  return {
    restrict: 'E',
    templateUrl: 'public/HTML/Directives/searchBar.html'
  };
});