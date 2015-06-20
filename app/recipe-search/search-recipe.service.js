(function(){
  'use strict';

  angular
    .module('app')
    .factory('searchRecipeService', searchRecipeService);

  searchRecipeService.$inject = ['$http','$q'];
  function searchRecipeService ($http,$q) {
    return {
      getTrends: getTrends,
      search: search
    };

    function getTrends (name){
      var deferred = $q.defer();
      $http.get('https://mysterious-eyrie-9135.herokuapp.com/recipe/getTrends').success(function(res){
        if(res.error){
          return deferred.reject(res.error);
        }
        deferred.resolve(res.recipes);
      }).error(function(err){
        deferred.reject(res.error);
      });
      return deferred.promise;
    }

    function search (name){
      var deferred = $q.defer();
      var req = {
        method: 'POST',
        url: 'https://mysterious-eyrie-9135.herokuapp.com/recipe/search',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        data: { search: name }
      };
      $http(req).success(function(res){
        if(res.error){
          return deferred.reject(res.error);
        }
        deferred.resolve(res.recipes);
      }).error(function(err){
        deferred.reject(res.error);
      });
      return deferred.promise;
    }
  }
})();
