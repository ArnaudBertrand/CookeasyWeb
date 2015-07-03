(function (){
  'use strict';

  angular
    .module('app')
    .controller('ViewProfileCtrl', ViewProfileCtrl);

  ViewProfileCtrl.$inject = ['ceUsers','userPre'];

  function ViewProfileCtrl (ceUsers,userPre) {
    var vm = this;

    vm.profile = userPre;

    vm.click = click;
    function click(){
      vm.profile.plop = 12;

      ceUsers.update({username: vm.profile.username},vm.profile).$promise.then(function(res){
        console.log(res);
      }, function(err){
        console.log(err);
      });
    }
  }
})();
