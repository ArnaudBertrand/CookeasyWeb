(function() {
  'use strict';

  angular
    .module('app')
    .factory('displayRecipeService', displayRecipeService);

  displayRecipeService.$inject = ['$http','$q'];
  function displayRecipeService($http, $q) {
    return {
      addComment: addComment,
      get: get,
    };

    function addComment(id, comment) {
      var deferred = $q.defer();
      var req = {
        method: 'POST',
        url: 'https://mysterious-eyrie-9135.herokuapp.com/recipe/comment/add/' + id,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        data: comment
      };
      $http(req).success(function (res) {
        if (res.error) {
          deferred.reject(res.error);
        } else {
          deferred.resolve(res.comment);
        }
      }).error(function (err) {
        deferred.reject(err);
      });
      return deferred.promise;
    }

    function get(id) {
      var deferred = $q.defer();
      $http.get('https://mysterious-eyrie-9135.herokuapp.com/recipe/get/' + id).success(function (res) {
        if (res.error) {
          return deferred.reject(res.error);
        }
        deferred.resolve(res.recipe);
      }).error(function (err) {
        deferred.reject(err);
      });
      return deferred.promise;
    }
  }
})();
