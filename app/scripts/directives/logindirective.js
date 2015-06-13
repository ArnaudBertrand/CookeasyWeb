'use strict';

/**
 * @ngdoc directive
 * @name applicationApp.directive:loginDirective
 * @description
 * # loginDirective
 */
angular.module('applicationApp')
  .directive('loginDirective', function () {
    return {
      templateUrl: 'views/login.html',
      restrict: 'E'
    };
  });
