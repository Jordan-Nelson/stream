angular.module('MovieDB')
.filter('overview', function() {
  return function(input, maxLen) {
    input = input || '';
    var sentenceEnd = function(text, start){
        if (text.substr(start, text.length - start).search(/\.|\?|!/) == -1){
          return -1;
        } else {
          return start + text.substr(start, text.length - start).search(/\.|\?|!/); // /.|/?|!
        };
    };
    if (input.length <= maxLen) {
      return input
    } else { 
      var stop = -1;
      while (sentenceEnd(input, stop + 1) < maxLen && sentenceEnd(input, stop + 1) > 0){
          stop = sentenceEnd(input, stop + 1);
      };
      return input.substr(0,stop + 1);
    };
  };
})