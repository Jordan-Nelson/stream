(function() {

  var app = angular.module("Stream");
 
  var MovieCardController = function($scope, rateMovie, auth, favorites, $location, sourceList) {
        
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

    var getAverageRating = function() {
        return rateMovie.getAverageRating($scope.result.id).then(function(data) {
            if(data !== 'NaN'){
                return data; 
            };
        }, onError);
    };

    var setAverageRating = function() {
        getAverageRating().then(function(data){
            $scope.result.rateMovie_averageRating = data
        });
    }

    setAverageRating();

    var getUserRating = function() {
        return auth.getUser().then(function(res) {
            if (res === '') {
                return -1;
            }
            return rateMovie.getUserRating($scope.result.id, res.email).then(function(data) {
                if (data !== 'NaN') {
                    return data; 
                } else {
                    return -1;
                };
            }, onError);
        });
    };

    var setUserRating = function() {
        getUserRating().then(function(data) {
            $scope.result.rateMovie_userRating = data;
        });
    }

    setUserRating();

    $scope.rateMovie = function(result, rating) {
        auth.getUser().then(function(res) {
            if (res === '') {
                $('#gridSystemModal').modal('show')
            } else {
                rateMovie.rateMovie(result.id, rating).then(function(data) {
                    if(data !== 'NaN'){
                        setUserRating();
                        setAverageRating();                       };
                }, onError);   
            }
        })
    };

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

    $scope.allSources = sourceList;

  };

  app.controller("MovieCardController", MovieCardController);

}());