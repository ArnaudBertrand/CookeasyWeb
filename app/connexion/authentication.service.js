(function(){
  'use strict';

  angular
    .module('app')
    .factory('CeAuthentication', CeAuthentication);

  function CeAuthentication () {
    return {
      isLogged: false
    };
  }
})();
