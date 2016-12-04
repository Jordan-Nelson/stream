var module = angular.module("Stream");
module.directive('phoneSubmit', function () {
    return function (scope, element, attr) {
        var textFields = $(element).children('div').children('input[type=search]');
        $(element).submit(function() {
            textFields.blur();
        });
    };
});