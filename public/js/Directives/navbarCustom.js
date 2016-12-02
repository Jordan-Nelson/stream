  var module = angular.module("Stream");
  module.directive('navbarCustom', ['$rootScope', function($rootScope) {
  return {
    restrict: 'E',
    templateUrl: 'public/HTML/Directives/navbarCustom.html',
    link: function($scope, element, attrs) {

      $scope.$watch(function() {
        return $rootScope.userAccount;
      }, function() {
        if(typeof $rootScope.userAccount !== 'undefined') {
          $scope.userEmail = $rootScope.userAccount.email;
        }
      }, true)
      }
    }
  }])


