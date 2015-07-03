(function (){
  'use strict';

  angular
    .module('app')
    .controller('EditProfileCtrl', EditProfileCtrl);

  EditProfileCtrl.$inject = ['ceUsers','userPre'];

  function EditProfileCtrl (ceUsers,userPre) {
    var vm = this;

    vm.edit = edit;
    vm.profile = userPre;

    init();
    function init(){
      vm.dobFormatted = new Date(vm.profile.dob);
    }

    function edit(){
      ceUsers.update({username: vm.profile.username},vm.profile).$promise.then(function(res){
        console.log(res);
      }, function(err){
        console.log(err);
      });
    }
  }
})();
