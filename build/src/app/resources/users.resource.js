(function(){
  'use strict';
  angular
    .module('app')
    .factory('ceUsers', ceUsers);

  ceUsers.$inject = ['$resource'];
  function ceUsers ($resource) {
    console.log('ok');
    return $resource('https://mysterious-eyrie-9135.herokuapp.com/users/:username',
      {username: '@username'},
      {'update': { method: 'PUT'}}
    );
  }
})();
