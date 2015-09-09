(function(){
  'use strict';

  angular
    .module('app')
    .factory('ceRecipes', ceRecipes);

  ceRecipes.$inject = ['$resource'];
  function ceRecipes ($resource) {
    return $resource('https://mysterious-eyrie-9135.herokuapp.com/recipes/:id',
      {id: '@id'},
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
