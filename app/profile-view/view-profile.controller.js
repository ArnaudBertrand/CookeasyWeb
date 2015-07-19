(function (){
  'use strict';

  angular
    .module('app')
    .controller('ViewProfileCtrl', ViewProfileCtrl);

  ViewProfileCtrl.$inject = ['userPre','ceModalGallery'];

  function ViewProfileCtrl (userPre,ceModalGallery) {
    var vm = this;
    vm.profile = userPre;
    vm.showProfilePicture = showProfilePicture;

    function showProfilePicture(){
      ceModalGallery.openGallery(0,[{url: vm.profile.picture}]);
    }
  }
})();
