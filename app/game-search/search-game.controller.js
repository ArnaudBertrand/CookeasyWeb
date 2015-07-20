(function(){
  'use strict';
  angular
    .module('app')
    .controller('GameSearchCtrl', GameSearchCtrl);

  GameSearchCtrl.$inject = ['$state','ceGames','gamesPre'];
  function GameSearchCtrl($state,ceGames,gamesPre) {
    var vm = this;

    vm.recipes = [];
    vm.trends = gamesPre;
    vm.games = gamesPre;
    vm.displayQuiz = displayGame;
    vm.search = search;

    function displayGame(id) {
      $state.go('recipeDisplay', {id: id});
    }

    function search() {
      if (vm.gameToSearch.length) {
        ceGames.query({match: vm.gameToSearch}).$promise.then(function (games) {
          vm.games = games;
        });
      } else {
        vm.games = vm.trends;
      }
    }
  }
})();
