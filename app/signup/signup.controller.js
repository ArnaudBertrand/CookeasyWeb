(function(){
  'use strict';

  angular
    .module('app')
    .controller('SignupCtrl',SignupCtrl);

  SignupCtrl.$inject = ['$resource','$state','$window','ceAuthentication'];
  function SignupCtrl ($resource,$state,$window,ceAuthentication) {
    var vm = this;
    var User = $resource('http://mysterious-eyrie-9135.herokuapp.com/user/:username');

    vm.user = new User();
    vm.connected = ceAuthentication.getUser();
    vm.register= register;

    function register() {
      vm.dataLoading = true;
      vm.errors = {};
      if(vm.user.username.length < 2) vm.errors.username = 'Username too short';
      if(vm.user.password.length < 6) vm.errors.password = 'Password too short';
      if(vm.user.email.length < 4) vm.errors.email = 'Please insert an e-mail';

      if(Object.keys(vm.errors).length > 0) return console.log(vm.errors);

      vm.user.$save().then(function(res){
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
