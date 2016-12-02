var module = angular.module("Stream");

module.directive('login', ['auth', '$location', '$rootScope', function(auth, $location, $rootScope) {
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
            }
            auth.getUser().then(function(res) {
              $rootScope.userAccount = res;
            })
          } else {
            $scope.signinFailure = 'The username and password combination entered was incorrect.'
          }
        })
      }
    }
  };
}]);