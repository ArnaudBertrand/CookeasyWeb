(function(){
  'use strict';

  angular
    .module('app')
    .factory('ceUser', ceUser);

  ceUser.$inject = ['$resource'];
  function ceUser ($resource) {
    return $resource('https://mysterious-eyrie-9135.herokuapp.com/user/:username',
      {username: '@username'},
      {'update': { method: 'PUT'}}
    );
  }
})();
