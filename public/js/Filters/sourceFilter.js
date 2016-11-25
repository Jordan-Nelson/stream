angular.module('MovieDB')
.filter('sourceFilter', function() {
  return function(items, list) {
    var output = [];
    angular.forEach(items, function(item) {
        angular.forEach(list, function(source){
            if (item.source === source){
                output.push(item);
            };
        })
            
    });
    return output;
  };
})