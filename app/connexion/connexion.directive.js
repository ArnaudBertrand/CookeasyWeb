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

    $scope.$watch(function(){
      return ceAuthentication.isLogged;
    },function(isLogged){
      vm.connected = isLogged;
    });

    vm.connected = ceAuthentication.isLogged;
    vm.login = login;
    vm.register = register;

    function login () {
      $state.go('login');
    }

    function register (){
      $state.go('register');
    }
  }
})();
