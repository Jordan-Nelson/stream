(function(){
  
  var getIP = function($http){
    
    var getIP = function(movieID){
      return $http.get("http://ipv4.myexternalip.com/json")
      .then(function(response){
          return response.data;                     
        });
    };
    
    return {
      getIP: getIP
    };
    
  };
  
  var module = angular.module("Stream");
  module.factory("getIP", getIP);
  
}());