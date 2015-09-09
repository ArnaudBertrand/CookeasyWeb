(function(){
  'use strict';

  angular
      .module( 'app.game.search', [])
      .controller('GameSearchCtrl', GameSearchCtrl);

  GameSearchCtrl.$inject = ['$state','ceGames','gamesPre'];
  function GameSearchCtrl($state,ceGames,gamesPre) {
    var vm = this;

    vm.recipes = [];
    vm.trends = gamesPre;
    vm.games = gamesPre;
    vm.displayGame = displayGame;
    vm.search = search;

    function displayGame(game){
      if(game.type === 'quiz') {return $state.go('gameDisplayQuiz', {id: game._id});}
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
