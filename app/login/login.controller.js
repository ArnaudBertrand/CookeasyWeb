(function() {
  'use strict';

  angular
    .module('app')
    .controller('LoginCtrl', LoginCtrl);

  LoginCtrl.$inject = ['$state','$window','loginService','ceAuthentication'];
  function LoginCtrl ($state,$window,loginService,ceAuthentication){
    var vm = this;

    vm.user = {id: '', password: ''};
    vm.connected = ceAuthentication.isLogged;
    vm.login= login;

    function login() {
      vm.dataLoading = true;
      vm.error = "";

      loginService.login(vm.user).then(function(res) {
        ceAuthentication.setUser(res.token,res.user);
        vm.notConnected = false;
        vm.dataLoading = false;
        $state.go('recipeSearch');
      }, function (error) {
        vm.error = error;
        vm.dataLoading = false;
      });
    }
  }
})();
