'use strict';

/**
 * @ngdoc service
 * @name applicationApp.RecipeService
 * @description
 * # RecipeService
 * Factory in the applicationApp.
 */
angular.module('applicationApp')
  .factory('RecipeService', function ($http,$q) {
    var services = {};
    services.addComment = function(id,comment){
      var deferred = $q.defer();
      var req = {
        method: 'POST',
        url: 'https://mysterious-eyrie-9135.herokuapp.com/recipe/comment/add/' +id,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        data: comment
      };
      $http(req).success(function(res){
        if(res.error){
          deferred.reject(res.error);
        } else {
          deferred.resolve(res.comment);
        }
      }).error(function(err){
        deferred.reject(err);
      });
      return deferred.promise;
    }

    services.create = function (recipe){
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
      $http(req).success(function(res){
        if(res.error){
          return deferred.reject(res.error);
        }
        deferred.resolve(res.id);
      }).error(function(err){
        deferred.reject(err);
      });
      return deferred.promise;
    }

    services.get = function(id){
      var deferred = $q.defer();
      $http.get('https://mysterious-eyrie-9135.herokuapp.com/recipe/get/' + id).success(function(res){
        if(res.error){
          return deferred.reject(res.error);
        }
        deferred.resolve(res.recipe);
      }).error(function(err){
        deferred.reject(err);
      });
      return deferred.promise;
    }

    services.search = function(name){
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

    return services;
  });
