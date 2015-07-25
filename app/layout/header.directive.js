(function(){
  'use strict';

  angular
    .module('app')
    .directive('ceHeader',ceHeader);

  function ceHeader () {
    return {
      templateUrl: '/layout/header.html',
      restrict: 'E',
      controller: CeHeaderController,
      controllerAs: 'ceHeader'
      };
  }

  CeHeaderController.$inject = ['$rootScope'];
  function CeHeaderController($rootScope){
    var vm = this,
      recipe = ['recipeCreate','recipeDisplay','recipeSearch'],
      game = ['gameCreateQuiz','gameDisplayQuiz','gameSearch'];

    vm.active = '';

    $rootScope.$on('$stateChangeStart',
      function(event, toState, toParams, fromState, fromParams){
        console.log(toState.name);
        if(vm.active !== 'game' && game.indexOf(toState.name) != -1) return vm.active = 'game';
        if(vm.active !== 'recipe' && recipe.indexOf(toState.name) != -1) return vm.active = 'recipe';
        if(vm.active !== 'login' && toState.name === 'login') return vm.active = 'login';
        if(vm.active !== 'register' && toState.name === 'register') return vm.active = 'register';
      });
  }
})();
