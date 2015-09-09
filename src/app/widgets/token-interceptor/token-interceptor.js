(function (){
  'use strict';

  angular
    .module('app')
    .factory('TokenInterceptor', TokenInterceptor);

  TokenInterceptor.$inject = ['$q','$window','ceAuthentication'];
  function TokenInterceptor ($q,$window,ceAuthentication) {
    return {
      request: function (config) {
        config.headers = config.headers || {};
        if ($window.sessionStorage.token) {
          config.headers.Authorization = 'Bearer ' + $window.sessionStorage.token;
        }
        return config;
      },

      requestError: function(rejection) {
        return $q.reject(rejection);
      },

      /* Set Authentication.isAuthenticated to true if 200 received */
      response: function (response) {
        if (response != null && response.status == 200 && $window.sessionStorage.token && !ceAuthentication.isAuthenticated) {
          ceAuthentication.isAuthenticated = true;
        }
        return response || $q.when(response);
      },

      /* Revoke client authentication if 401 is received */
      responseError: function(rejection) {
        if (rejection != null && rejection.status === 401 && ($window.sessionStorage.token || ceAuthentication.isAuthenticated)) {
          delete $window.sessionStorage.token;
          ceAuthentication.isAuthenticated = false;
        }

        return $q.reject(rejection);
      }
    };
  }
})();
