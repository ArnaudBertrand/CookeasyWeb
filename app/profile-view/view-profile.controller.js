(function (){
  'use strict';

  angular
    .module('app')
    .controller('ViewProfileCtrl', ViewProfileCtrl);

  ViewProfileCtrl.$inject = ['userPre','ceAuthentication','ceModalGallery'];

  function ViewProfileCtrl (userPre,ceAuthentication,ceModalGallery) {
    var vm = this;
    vm.isProfile = isProfile;
    vm.profile = userPre;
    vm.showProfilePicture = showProfilePicture;

    function isProfile(){
      var user = ceAuthentication.getUser();
      return user && user.username == vm.profile.username;
    }

    function showProfilePicture(){
      ceModalGallery.openGallery(0,[{url: vm.profile.picture}]);
    }

  }
})();
