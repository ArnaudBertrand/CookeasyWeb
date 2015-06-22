(function(){
  'use strict';

  angular
    .module('app')
    .controller('SignupCtrl',SignupCtrl);

  SignupCtrl.$inject = ['$window','signupService','ceAuthentication'];
  function SignupCtrl ($window,signupService,ceAuthentication) {
    var vm = this;

    vm.user = {username: '', password: '', confirmPassword: '', email: ''};
    vm.connected = ceAuthentication.isLogged;
    vm.signUp= signUp;

    function signUp() {
      vm.dataLoading = true;
      vm.error = "";

      if (vm.user.password !== vm.user.confirmPassword) {
        vm.dataLoading = false;
        return vm.error = "Passwords do not match";
      }

      signupService.signUp(vm.user).then(function (token) {
        ceAuthentication.isLogged = true;
        vm.notConnected = false;
        $window.sessionStorage.token = token;
        vm.dataLoading = false;
      }, function (error) {
        vm.error = error;
        vm.dataLoading = false;
      });
    }
  }
})();
