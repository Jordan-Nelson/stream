var module = angular.module("Stream");

module.directive('login', ['auth', '$location', '$route', '$timeout', function(auth, $location, $route, $timeout) {
  return {
    restrict: 'E',
    templateUrl: 'public/HTML/Directives/login.html',
    link: function($scope, element, attrs) {
      $scope.signIn = function() {
        $scope.signinFailure = '';
        $scope.signupFailure = '';
        auth.signin($scope.signinEmail, $scope.signinPassword).then(function(res) {
          if(res === true) {
            if($location.url() === '/login') {
              $location.path('/');
            } else {
              $('#gridSystemModal').modal('hide');
              $timeout(function () {
                  $route.reload();
              }, 200);
            }
          } else {
            $scope.signinFailure = 'The username and password combination entered was incorrect.'
          }
        })
      }
    }
  };
}]);