'use strict';

/**
 * @ngdoc service
 * @name applicationApp.UserService
 * @description
 * # UserService
 * Factory in the applicationApp.
 */
angular.module('applicationApp')
  .factory('UserService', function ($http, $q) {
    var services = {};
    services.login = function (user) {
      var deferred = $q.defer();
      var req = {
        method: 'POST',
        url: 'https://mysterious-eyrie-9135.herokuapp.com/user/login',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        data: user
      };
      $http(req).success(function(res){
        deferred.resolve(res.token);
      }).error(function(res){
        deferred.reject(res.error);
      });
      return deferred.promise;
    }

    services.logout = function(){
      return false;
    }

    services.signUp = function (user) {
      var deferred = $q.defer();
      var req = {
        method: 'POST',
        url: 'https://mysterious-eyrie-9135.herokuapp.com/user/signup',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        data: user
      };
      $http(req).success(function(res){
        deferred.resolve(res.token);
      }).error(function(res){
        deferred.reject(res.error);
      });
      return deferred.promise;
    }

    services.test = function () {
      var req = {
        method: 'POST',
        url: 'https://mysterious-eyrie-9135.herokuapp.com/recipe/create',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }, data: {
          title: "La recette a michou",
          course: 1,
          type: 1,
          ingredients: [{name: "potatoes", qte: 12, unit: "kg"},
            {name: "rice", qte: 5, unit: "kg"},
            {name: "milk", qte: 12, unit: "L"}],
          steps: [{number: 1, action: "Cut the potatoes", time: 10},
            {number: 2, action: "Eat the rice", time: 20}]
        }
      };

      return $http(req);
    }

    services.testGet = function () {
      var req = {
        method: 'GET',
        url: 'https://mysterious-eyrie-9135.herokuapp.com/recipe/get/555c5699f2f7f603003725c4',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      };

      return $http(req);
    }
    return services;
  });
