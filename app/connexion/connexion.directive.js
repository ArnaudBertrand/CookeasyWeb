(function(){
  'use strict';
  angular
    .module('app')
    .directive('ceConnexion', ceConnexion);

  function ceConnexion () {
    return {
      templateUrl: '/connexion/connexion.html',
      restrict: 'E',
      controller: ConnexionCtrl,
      controllerAs: 'connexion'
    };
  }

  ConnexionCtrl.$inject = ['$window','connexionService','ceAuthentication'];
  function ConnexionCtrl ($window,connexionService,ceAuthentication){
    var vm = this;

    vm.userLogin = {id: '', password: ''};
    vm.userSignup = {username: '', password: '', confirmPassword: '', email: ''};
    vm.notConnected = !ceAuthentication.isLogged;
    vm.login = login;
    vm.register = register;

    function login () {
      vm.dataLoading = true;
      vm.error = "";

      connexionService.login(vm.userLogin).then(function (token) {
        ceAuthentication.isLogged = true;
        vm.notConnected = false;
        $window.sessionStorage.token = token;
        vm.dataLoading = false;
      }, function (error){
        vm.error = error;
        vm.dataLoading = false;
      });
    }

    function register (){
      vm.dataLoading = true;
      vm.error = "";

      if(vm.userSignup.password !== vm.userSignup.confirmPassword){
        vm.dataLoading = false;
        return vm.error = "Passwords do not match";
      }

      connexionService.signUp(vm.userSignup).then(function(token) {
        ceAuthentication.isLogged = true;
        vm.notConnected = false;
        $window.sessionStorage.token = token;
        vm.dataLoading = false;
      },function(error){
        vm.error = error;
        vm.dataLoading = false;
      });
    }
  }
})();
