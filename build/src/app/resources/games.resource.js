(function(){
  'use strict';

  angular
    .module('app')
    .factory('ceGames', ceGames)
    .factory('ceGamesQuizzes', ceGamesQuizzes);

  ceGames.$inject = ['$resource'];
  function ceGames ($resource) {
    return $resource('https://mysterious-eyrie-9135.herokuapp.com/games/:id', {id: '@id'});
  }

  ceGamesQuizzes.$inject = ['$resource'];
  function ceGamesQuizzes ($resource) {
    return $resource('https://mysterious-eyrie-9135.herokuapp.com/games/quizzes', {},
      {'saveAndGetId': {
        method: 'POST',
        transformResponse: function (data) {
          var res = JSON.parse(data);
          return typeof res !== 'object'? {id: data}: res;
        }
      }}
    );
  }
})();
