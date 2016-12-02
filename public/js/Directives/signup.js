var module = angular.module("Stream");

module.directive('signup', ['auth', '$location', '$rootScope', function(auth, $location, $rootScope) {
  return {
    restrict: 'E',
    templateUrl: 'public/HTML/Directives/signup.html',
    link: function($scope, element, attrs) {
      $scope.validateSignup = function(){
        $scope.signinFailure = '';
        $scope.signupFailure = '';
        if (typeof $scope.email === 'undefined' || typeof $scope.password === 'undefined' || typeof $scope.passwordConfirm === 'undefined'){
          $scope.signupError = "Please fill out each feild";
        } else if (!$scope.email.match(/.{1,}@.{1,}\..{1,}/)){
          $scope.signupError = "Please enter a valid email address";
        } else if (!$scope.password.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/)){
          $scope.signupError = "Your password must be at least 6 characters and contain at least one letter and number";
        } else if($scope.password !== $scope.passwordConfirm) {
          $scope.signupError = "Your passwords must match";
        } else { 
          auth.signup($scope.email, $scope.password).then(function(res) {
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
              $scope.signupFailure = 'There is already a user with that email address.'
            }
          })
        }
          return;
      }
    }
  };
}]);