(function(){
  'use strict';

  angular
    .module('app')
    .factory('signupService', signupService);

  signupService.$inject = ['$http', '$q'];
  function signupService ($http, $q) {
    return {
      signUp: signUp
    };

    function signUp (user) {
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
  }
})();
