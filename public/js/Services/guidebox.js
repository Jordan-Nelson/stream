(function(){
  
  var guidebox = function($http){

    var getStreamingSources = function(tmdbID) {
      return $http.get('/source/' + tmdbID).then(function(response) {
        return response.data;
      });
    }
    
    return {
      getStreamingSources: getStreamingSources
    };
    
  };
  
  var module = angular.module("Stream");
  module.factory("guidebox", guidebox);
  
}());