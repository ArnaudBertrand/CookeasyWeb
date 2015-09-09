(function(){
  'use strict';

  angular
      .module( 'app.profile.edit', [])
      .controller('EditProfileCtrl', EditProfileCtrl);

  EditProfileCtrl.$inject = ['$state','ceUsers','userPre'];
  function EditProfileCtrl ($state,ceUsers,userPre) {
    var vm = this;

    vm.edit = edit;
    vm.profile = userPre;

    init();
    function init(){
      vm.dobFormatted = new Date(vm.profile.dob);
    }

    function edit(){
      vm.profile.dob = vm.dobFormatted.getTime();
      ceUsers.update({username: vm.profile.username},vm.profile).$promise.then(function(){
        $state.go('profileView',{username: vm.profile.username});
      }, function(err){
        console.log(err);
      });
    }
  }
})();
