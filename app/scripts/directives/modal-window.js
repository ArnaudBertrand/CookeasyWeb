'use strict';

/**
 * @ngdoc directive
 * @name applicationApp.directive:modalWindow
 * @description
 * # modalWindow
 */
angular.module('applicationApp')
  .directive('modalWindow', function () {
    return {
      templateUrl: 'views/modal-window.html',
      restrict: 'E'
    };
  });
