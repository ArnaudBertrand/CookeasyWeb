'use strict';

/**
 * @ngdoc function
 * @name applicationApp.controller:ContactCtrl
 * @description
 * # ContactCtrl
 * Controller of the applicationApp
 */
angular.module('applicationApp')
  .controller('StepLineCtrl',
    ['$scope', function ($scope) {

      // Get starting position (for dot)
      $scope.getStartX = function(){
        return dotSize/2;
      }

      // Get ending position (for dot)
      $scope.getEndX = function(){
        return $scope.graph.width - dotSize/2;
      }

      // Get the middle position
      $scope.getMiddleY = function (){
        return $scope.graph.height/2;
      };
    }]);
