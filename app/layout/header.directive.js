(function(){
  'use strict';

  angular
    .module('app')
    .directive('ceHeader',ceHeader);

  function ceHeader () {
    return {
      templateUrl: '/layout/header.html',
      restrict: 'E'
    };
  }
})();
