'use strict';

/**
 * @ngdoc service
 * @name applicationApp.AuthenticationService
 * @description
 * # AuthenticationService
 * Factory in the applicationApp.
 */
angular.module('applicationApp')
  .factory('AuthenticationService', function () {
    var auth = {
      isLogged: false
    };
    
    return auth;
  });