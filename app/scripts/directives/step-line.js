'use strict';

/**
 * @ngdoc directive
 * @name applicationApp.directive:pictureUpload
 * @description
 * # pictureUplaod
 */
angular.module('applicationApp')
  .directive('stepLine', function () {
    return {
      templateUrl: 'views/step-line.html',
      restrict: 'E',
      scope: {
        graph: '=',
        steps: '=',
        current: '=',
        callbackClick: '=stepClicked'
      },
      link: function($scope, element, attrs){
        // Set the line steps
        $scope.$watchCollection('steps', function(){
          console.log($scope.steps);
          var interval = 0;
          if($scope.steps.length != 1){
            interval = ($scope.graph.width-2*$scope.graph.rSize)/($scope.steps.length-1);
            var pos = 0;
            $scope.stepPos = $scope.steps.map(function(step){
              var step = {text: step};
              step.x = interval*pos + $scope.graph.rSize;
              pos++;
              return step;
            });
          } else {
            return [{x: $scope.graph.width/2, text: $scope.steps[0]}];
          }
        });
      },
      controller: function($scope){
        // Get starting position (for dot)
        $scope.getStartX = function(){
          return $scope.graph.rSize/2;
        }

        // Get ending position (for dot)
        $scope.getEndX = function(){
          return $scope.graph.width - $scope.graph.rSize/2;
        }

        // Get the middle position
        $scope.getMiddleY = function (){
          return $scope.graph.height/2;
        };
      }
    };
  });
