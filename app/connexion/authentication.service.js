(function(){
  'use strict';

  angular
    .module('app')
    .factory('ceAuthentication', ceAuthentication);

  ceAuthentication.$inject = ['$window'];
  function ceAuthentication ($window) {
    var connectedUser = false;
    return {
      getUser: getUser,
      setUser: setUser
    };

    function getUser() {
      if(!connectedUser){
        var user = $window.sessionStorage.user;
        if(user) connectedUser = JSON.parse(user);
      }
      return connectedUser;
    }

    function setUser(token,user){
      console.log(user);
      $window.sessionStorage.token = token;
      $window.sessionStorage.user = JSON.stringify(user);
    }

  }
})();
