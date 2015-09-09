(function(){
  'use strict';

  angular
    .module('app')
    .factory('cePictures', cePictures);

  cePictures.$inject = ['$resource'];
  function cePictures ($resource) {
    return $resource('https://mysterious-eyrie-9135.herokuapp.com/pictures',
      {id: '@id'},
      {'update': { method: 'PUT'}}
    );
  }
})();
