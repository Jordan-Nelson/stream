(function(){
  
  var guidebox = function($http){
    
    var getSources = function(tmdbID){
      
      return $http.get("https://api-public.guidebox.com/v1.43/US/rKVvk6b7F2r23KAhseugCCIB47sTI7Tp/search/movie/id/themoviedb/" + tmdbID)
      .then(function(response){
          return response.data;
        });
      
    };
    
    var setSources = function(guideBoxId){
      
      return $http.get("https://api-public.guidebox.com/v1.43/US/rKVvk6b7F2r23KAhseugCCIB47sTI7Tp/movie/" + guideBoxId)
        .then(function(response){
          return response.data;
        });
      
    };
    
    return {
      getSources: getSources,
      setSources: setSources
    };
    
  };
  
  var module = angular.module("MovieDB");
  module.factory("guidebox", guidebox);
  
}());