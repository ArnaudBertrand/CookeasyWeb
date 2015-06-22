(function(){
  'use strict';

  angular
    .module('app')
    .factory('loginService', loginService);

  loginService.$inject = ['$http', '$q'];
  function loginService ($http, $q) {
    return {
      login: login
    };

    function login (user) {
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
  }
})();
