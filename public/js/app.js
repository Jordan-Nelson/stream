(function() {

  var app = angular.module("Stream", ['ngRoute', 'ngCookies']);

  app.config(function($routeProvider) {
    $routeProvider
      .when("/", {
        templateUrl: "public/HTML/main.html",
        controller: "MainController"
      })
      .when("/search/:query", {
        templateUrl: "public/HTML/search.html",
        controller: "SearchController"
      })
      .when("/similar/:id", {
        templateUrl: "public/HTML/search.html",
        controller: "SearchController"
      })
      .when("/feedback", {
        templateUrl: "public/HTML/feedback.html",
      })
      .when("/category/popular", {
        templateUrl: "public/HTML/search.html",
        controller: "SearchController"
      })
      .when("/category/G-rated", {
        templateUrl: "public/HTML/search.html",
        controller: "SearchController"
      })
      .when("/category/comedy", {
        templateUrl: "public/HTML/search.html",
        controller: "SearchController"
      })
      .when("/category/Top-rated", {
        templateUrl: "public/HTML/search.html",
        controller: "SearchController"
      })
      .when("/category/Top-2016", {
        templateUrl: "public/HTML/search.html",
        controller: "SearchController"
      })
      .when("/category/Sci-fi", {
        templateUrl: "public/HTML/search.html",
        controller: "SearchController"
      })
      .when("/login", {
        templateUrl: "public/HTML/login.html",
        controller: "LoginController"
      })      
      .otherwise({
        redirectTo: "/"
      })
  });

  window.onload = function() {
    $(".se-pre-con").fadeOut("slow");
    
    $(document).ready(function(e) {
      $('.search-panel .dropdown-menu').find('a').click(function(e) {
        e.preventDefault();
        var param = $(this).attr("href").replace("#", "");
        var concept = $(this).text();
        $('.search-panel span#search_concept').text(concept);
        $('.input-group #search_param').val(param);
      });
    });
  };

}());