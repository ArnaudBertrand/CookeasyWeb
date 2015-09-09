(function(){
  'use strict';

  angular
      .module( 'app.login', [
        'ui.router'
      ])
      .config(config)
      .controller('LoginCtrl', LoginCtrl);

  config.$inject = ['$stateProvider'];
  function config( $stateProvider ) {
    $stateProvider.state( 'login', {
      url: '/login',
      views: {
        "main": {
          controller: 'LoginCtrl',
          controllerAs: 'login',
          templateUrl: 'login/login.tpl.html'
        }
      },
      data:{ pageTitle: 'Login' }
    });
  }

  LoginCtrl.$inject = ['$state','loginService','ceAuthentication'];
  function LoginCtrl ($state,loginService,ceAuthentication){
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
