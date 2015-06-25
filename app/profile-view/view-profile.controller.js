(function (){
  'use strict';

  angular
    .module('app')
    .controller('ViewProfileCtrl', ViewProfileCtrl);

  ViewProfileCtrl.$inject = ['ceUser','userPre'];

  function ViewProfileCtrl (ceUser,userPre) {
    var vm = this;

    vm.profile = userPre;

    vm.click = click;
    function click(){
      vm.profile.plop = 12;

      ceUser.update({username: vm.profile.username},vm.profile).$promise.then(function(res){
        console.log(res);
      }, function(err){
        console.log(err);
      });
    }
  }
})();
