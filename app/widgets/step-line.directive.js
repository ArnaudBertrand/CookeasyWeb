(function(){
  'use strict';

  angular
    .module('app')
    .directive('stepLine',stepLine);

  function stepLine () {
    return {
      templateUrl: '/widgets/step-line.html',
      restrict: 'E',
      scope: {
        graph: '=',
        steps: '=',
        current: '=',
        callbackClick: '=stepClicked'
      },
      controller: stepLineCtrl,
      controllerAs: 'stepLine',
      bindToController: true
    };
  }

  stepLineCtrl.$inject = ['$scope'];
  function stepLineCtrl ($scope){
    var vm = this;

    vm.getStartX = getStartX;
    vm.getEndX = getEndX;
    vm.getMiddleY = getMiddleY;

    function getStartX (){
      return $scope.graph.rSize/2;
    }

    function getEndX (){
      return $scope.graph.width - $scope.graph.rSize/2;
    }

    function getMiddleY (){
      return $scope.graph.height/2;
    }

    $scope.$watchCollection(function(){
      return vm.steps;
    }, function(){
      var interval = 0;
      if(vm.steps.length != 1){
        interval = (vm.graph.width-2*vm.graph.rSize)/(vm.steps.length-1);
        var pos = 0;
        vm.stepPos = vm.steps.map(function(step){
          var step = {text: step};
          step.x = interval*pos + vm.graph.rSize;
          pos++;
          return step;
        });
      } else {
        return [{x: vm.graph.width/2, text: vm.steps[0]}];
      }
    });
  }
})();
