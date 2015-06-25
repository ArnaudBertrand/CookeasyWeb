(function (){
  'use strict';

  angular
    .module('app')
    .controller('ViewProfileCtrl', ViewProfileCtrl);

  ViewProfileCtrl.$inject = ['userPre'];

  function ViewProfileCtrl (userPre) {
    var vm = this;

    vm.profile = userPre;
  }
})();
