(function() {
  'use strict';

  angular.module('app.game', ['ui.router','app.game.quiz.create','app.game.quiz.display','app.game.search'])
      .config(config);

  config.$inject = ['$stateProvider'];
  function config($stateProvider) {

    $stateProvider
        .state( 'gameCreateQuiz', {
          url: '/game/create/quiz',
          views: {
            "main": {
              controller: 'GameCreateQuizCtrl',
              controllerAs: 'quizCreate',
              templateUrl: 'game/create/create-quiz.tpl.html'
            }
          },
          data:{ pageTitle: 'Create a quiz' }
        })
        .state( 'gameDisplayQuiz', {
          url: '/game/display/quiz/:id',
          views: {
            "main": {
              controller: 'GameDisplayQuizCtrl',
              controllerAs: 'quizDisplay',
              templateUrl: 'game/display/display-quiz.tpl.html',
              resolve: {
                quizPre: quizPre
              }
            }
          },
          data:{ pageTitle: 'Playing a game' }
        })
        .state( 'gameSearch', {
          url: '/game/search',
          views: {
            "main": {
              controller: 'GameSearchCtrl',
              controllerAs: 'gameSearch',
              templateUrl: 'game/search/search.tpl.html',
              resolve: {
                gamesPre: gamesPre
              }
            }
          },
          data:{ pageTitle: 'Search games' }
        });
  }

  gamesPre.$inject = ['ceGames'];
  function gamesPre (ceGames){
    return ceGames.query().$promise.then(function(games){
      return games;
    });
  }

  quizPre.$inject = ['$stateParams','ceGames'];
  function quizPre ($stateParams,ceGames){
    return ceGames.get({id: $stateParams.id}).$promise.then(function(quiz){
      return quiz;
    });
  }
})();