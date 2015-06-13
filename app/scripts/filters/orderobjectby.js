'use strict';

/**
 * @ngdoc filter
 * @name applicationApp.filter:orderObjectBy
 * @function
 * @description
 * # range
 * Filter in the applicationApp.
 */
angular.module('applicationApp')
  .filter('orderObjectBy', function() {
    return function(items, field, order) {
      var filtered = [];
      angular.forEach(items, function(item) {
        filtered.push(item);
      });
      filtered.sort(function (a, b) {
        return (a[field] > b[field] ? 1 : -1);
      });
      if(order === -1) filtered.reverse();
      return filtered;
    };
  });
