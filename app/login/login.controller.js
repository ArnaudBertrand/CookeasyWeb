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

      loginService.login(vm.user).then(function (token) {
        ceAuthentication.isLogged = true;
        vm.notConnected = false;
        $window.sessionStorage.token = token;
        vm.dataLoading = false;
        $state.go('rearchSearch');
      }, function (error) {
        vm.error = error;
        vm.dataLoading = false;
      });
    }
  }
})();
