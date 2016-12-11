  var module = angular.module("Stream");
  
  module.directive('movieCard', function(rateMovie, $location, auth, favorites) {
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
                $scope.showCover = true;
            }
        }

        $scope.hoverPoster = function() {
            if (window.outerWidth >= 1200 && $scope.showCover === false) {
                $scope.showCover = true;
            }
        }

        $scope.clickCover = function() {
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

        $scope.getUserRating = function(result, id) {
            auth.getUser().then(function(res) {
                if (res === '') {
                    return;
                }
                rateMovie.getUserRating(id, res.email).then(function(data) {
                    if (data !== 'NaN') {
                        result.rateMovie_userRating = data; 
                    };
                }, onError);
            });

        };

        $scope.getUserRating($scope.result, $scope.result.id);

        $scope.rateMovie = function(result, rating) {
            auth.getUser().then(function(res) {
                if (res === '') {
                    $('#gridSystemModal').modal('show')
                } else {
                    rateMovie.rateMovie(result.id, rating).then(function(data) {
                        if(data !== 'NaN'){
                        result.rateMovie_averageRating = data; 
                        };
                    }, onError);   
                }
            })
        };

        $scope.rateMovieTouch = function(result, rating) {
            if (window.outerWidth < 1200) {
                $scope.rateMovie(result, rating);
            }
        }

        $scope.favoriteMovie = function(movie) {
            auth.getUser().then(function(res) {
                if (res === '') {
                    $('#gridSystemModal').modal('show')
                } else {
                    favorites.postFavorite(movie).then(function(data) {
                        $scope.getFavorite(movie);
                    }, onError);   
                }
            })
        }

        $scope.unfavoriteMovie = function(movie) {
            auth.getUser().then(function(res) {
                if (res === '') {
                    $('#gridSystemModal').modal('show')
                } else {
                    favorites.deleteFavorite(movie).then(function(data) {
                        $scope.getFavorite(movie);
                    }, onError);   
                }
            })
        }

        $scope.favoriteMovieTouch = function(movie) {
            if (window.outerWidth < 1200) {
                $scope.favoriteMovie(movie);
            }
        }

        $scope.unfavoriteMovieTouch = function(movie) {
            if (window.outerWidth < 1200) {
                $scope.unfavoriteMovie(movie);
            }
        }

        $scope.isFavorite;
        $scope.getFavorite = function(movie) {
            favorites.isFavorite(movie.id).then(function(data) {
                $scope.isFavorite = data.isFavorite;
            }, onError);  
        }
        $scope.getFavorite($scope.result);
            
        var onError = function(reason) {
            console.log("Error receiving results");
        };

        $scope.allSources = ['amazon_prime', 'netflix', 'hulu_plus', 'hbo_now', 'fandor', 'shudder', 'showtime_subscription', 'amazon_buy', 'itunes', 'google_play', 'vudu', 'youtube_purchase', 'cinemanow']

    }
  };
});