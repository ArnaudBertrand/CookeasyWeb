(function(){
  'use strict';

  angular
    .module('app')
    .factory('ceRecipesComments', ceRecipesComments);

  ceRecipesComments.$inject = ['$resource'];
  function ceRecipesComments ($resource) {
    return $resource('https://mysterious-eyrie-9135.herokuapp.com/recipes/:recipeId/comments/:commentId',
      {
        recipeId: '@recipeId',
        commentId: '@commentId'
      },
      {'update': { method: 'PUT'}}
    );
  }
})();
