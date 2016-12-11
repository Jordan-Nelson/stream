  var module = angular.module("Stream");
  module.directive('navbarCustom', ['auth', function(auth) {
  return {
    restrict: 'E',
    templateUrl: 'public/HTML/Directives/navbarCustom.html',
    link: function($scope, element, attrs) {

        $scope.$on('$routeChangeSuccess', function () {
          auth.getUser().then(function(res) {
            $scope.userEmail = res.email;
          })
        });
        
      }
    }
  }])


