  var module = angular.module("Stream");
  
  module.directive('movieCard', function(rateMovie, $location, $rootScope) {
  return {
    restrict: 'E',
    scope: {
      result: '=',
      email: '='
    },
    templateUrl: 'public/HTML/Directives/movieCard.html',
    link: function($scope, element, attrs) {
        
        $scope.showCover = false;

        $scope.clickPoster = function() {
            if (window.outerWidth < 1200 && $scope.showCover === false) {
                document.getElementById('searchQuery').blur();
                $scope.showCover = true;
            }
        }

        $scope.hoverPoster = function() {
            if (window.outerWidth >= 1200 && $scope.showCover === false) {
                $scope.showCover = true;
            }
        }

        $scope.clickCover = function() {
            //$event.stopPropagation();
            if (window.outerWidth < 1200 && $scope.showCover === true) {
                $scope.showCover = false;
            }
        }

        $scope.unhoverCover = function() {
            if (window.outerWidth >= 1200 && $scope.showCover === true) {
                $scope.showCover = false;
            }
        }

        $scope.findSimilarMovies = function(id) {
            $location.path("/similar/" + id);
        };
        
        $scope.getAverageRating = function(result, id) {
            rateMovie.getAverageRating(id).then(function(data) {
                if(data !== 'NaN'){
                result.rateMovie_averageRating = data; 
                };
            }, onError);
        };

        $scope.getAverageRating($scope.result, $scope.result.id);

        $scope.rateMovie = function(result, rating) {
            if (typeof $rootScope.userAccount === 'undefined') {
                $('#gridSystemModal').modal('show')
            } else {
                rateMovie.rateMovie(result.id, rating, $rootScope.userAccount.email).then(function(data) {
                    if(data !== 'NaN'){
                    result.rateMovie_averageRating = data; 
                    };
                }, onError);   
            }
        };

        $scope.rateMovieTouch = function(result, rating) {
            if (window.outerWidth < 1200) {
                $scope.rateMovie(result, rating);
            }
        }
            
        var onError = function(reason) {
            console.log("Error receiving results");
        };

        $scope.allSources = ['amazon_prime', 'netflix', 'hulu_plus', 'hbo_now', 'fandor', 'shudder', 'showtime_subscription', 'amazon_buy', 'itunes', 'google_play', 'vudu', 'youtube_purchase', 'cinemanow']

    }
  };
});