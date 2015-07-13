(function(){
  'use strict';

  angular
    .module('app')
    .directive('menuLeft',menuLeft);

  function menuLeft () {
    return {
      templateUrl: '/layout/menu-left.html',
      restrict: 'E',
      replace: true,
      controller: MenuLeftCtrl,
      controllerAs: 'menuLeft'
    };
  }

  MenuLeftCtrl.$inject = ['$rootScope','$state','ceAuthentication'];
  function MenuLeftCtrl($rootScope,$state,ceAuthentication){
    var vm = this;

    vm.goToProfile = goToProfile;
    vm.opened = false;
    vm.toggleDisplay = toggleDisplay;

    function goToProfile(){
      var user = ceAuthentication.getUser();
      // Not connected
      if(!user) return $state.go('login');
      // Go to profile
      toggleDisplay();
      $state.go('profileView',{username: user.username});
    }

    function toggleDisplay(){
      vm.opened = !vm.opened;
      $rootScope.bodyPush = vm.opened;
    }
  }
})();
