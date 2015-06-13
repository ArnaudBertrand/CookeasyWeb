'use strict';

/**
 * @ngdoc directive
 * @name applicationApp.directive:headerPrincipal
 * @description
 * # headerPrincipal
 */
angular.module('applicationApp')
  .directive('headerPrincipal', function () {
    return {
      templateUrl: 'views/header-principal.html',
      restrict: 'E'
    };
  });
