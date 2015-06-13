'use strict';

/**
 * @ngdoc filter
 * @name applicationApp.filter:range
 * @function
 * @description
 * # range
 * Filter in the applicationApp.
 */
angular.module('applicationApp')
  .filter('range', function () {
    return function(val, range) {
      range = parseInt(range);
      for (var i=0; i<range; i++)
        val.push(i);
      return val;
    };
  });
