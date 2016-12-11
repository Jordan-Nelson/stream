(function(){
  
  var auth = function($http){
    
    var signin = function(email, password){
      return $http.get('/auth/signin?email=' + email + '&password=' + password)
      .then(function(response){
          return response.data.success;                     
        });
    };

    var signup = function(email, password){
      return $http.post('/auth/signup', {email: email, password: password} )
      .then(function(response){
          return response.data.success;                     
        });
    };

    var getUser = function(){
      return $http.get("/auth/user")
      .then(function(response){
          return response.data;                     
        });
    };

    var reload = false;
    
    return {
      signin: signin,
      signup: signup,
      getUser: getUser
    };
    
  };
  
  var module = angular.module("Stream");
  module.factory("auth", auth);
  
}());