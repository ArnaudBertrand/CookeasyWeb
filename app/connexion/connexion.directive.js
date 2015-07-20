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

  ConnexionCtrl.$inject = ['$scope','$state','ceAuthentication'];
  function ConnexionCtrl ($scope,$state,ceAuthentication){
    var vm = this;

    vm.connected = ceAuthentication.isLogged;
    vm.login = login;
    vm.logout = logout;
    vm.profile = profile;
    vm.register = register;
    vm.toggleUser = toggleUser;

    $scope.$watch(function(){
      return ceAuthentication.getUser();
    },function(user){
      vm.userConnected = user;
    });

    function login(){
      $state.go('login');
    }

    function logout(){
      ceAuthentication.logout();
      vm.userInfo = false;
    }

    function profile(){
      console.log(vm.userConnected.username);
      $state.go('profileView',{username: vm.userConnected.username});
    }

    function register(){
      $state.go('register');
    }

    function toggleUser(){
      vm.userInfo = !vm.userInfo;
    }
  }
})();
