(function() {
  'use strict';

  angular
    .module('app')
    .factory('createRecipeService', createRecipeService);

  createRecipeService.$inject = ['$http','$q'];
  function createRecipeService($http, $q) {
    return {
      create: create
    };

    function create(recipe) {
      var deferred = $q.defer();
      var req = {
        method: 'POST',
        url: 'https://mysterious-eyrie-9135.herokuapp.com/recipe/create',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        data: recipe
      };
      $http(req).success(function (res) {
        if (res.error) {
          return deferred.reject(res.error);
        }
        deferred.resolve(res.id);
      }).error(function (err) {
        deferred.reject(err);
      });
      return deferred.promise;
    }
  }
})();
