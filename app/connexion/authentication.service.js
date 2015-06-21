(function(){
  'use strict';

  angular
    .module('app')
    .factory('CeAuthentication', ceAuthentication);

  function ceAuthentication () {
    return {
      isLogged: false
    };
  }
})();
