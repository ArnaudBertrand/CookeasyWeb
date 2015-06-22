(function(){
  'use strict';

  angular
    .module('app')
    .factory('ceAuthentication', ceAuthentication);

  function ceAuthentication () {
    return {
      isLogged: false
    };
  }
})();
