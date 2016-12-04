var module = angular.module("Stream");
module.directive('phoneSubmit', function () {
    return function (scope, element, attr) {
        var textFields = $(element).children('input[type=text]');
        $(element).submit(function() {
            textFields.blur();
        });
    };
});