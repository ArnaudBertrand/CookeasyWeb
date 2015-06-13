'use strict';

/**
 * @ngdoc directive
 * @name applicationApp.directive:menuDirective
 * @description
 * # Menu directive
 */
angular.module('applicationApp')
  .directive('menuDirective', function () {
    return {
      templateUrl: 'views/menu.html',
      restrict: 'E'
    };
  });
