(function() {
  'use strict';

  angular.module('app.profile', ['ui.router','app.profile.view','app.profile.edit'])
      .config(config);

  config.$inject = ['$stateProvider'];
  function config($stateProvider) {

    $stateProvider
        .state( 'profileEdit', {
          url: '/user/edit/:username',
          views: {
            "main": {
              controller: 'EditProfileCtrl',
              controllerAs: 'profEdit',
              templateUrl: 'profile/edit/edit.tpl.html',
              resolve: {
                userPre: userFromUsername
              }
            }
          },
          data:{ pageTitle: 'Edit profile' }
        })
        .state( 'profileView', {
          url: '/user/:username',
          views: {
            "main": {
              controller: 'ViewProfileCtrl',
              controllerAs: 'profView',
              templateUrl: 'profile/view/view.tpl.html',
              resolve: {
                userPre: userFromUsername
              }
            }
          },
          data:{ pageTitle: 'View profile' }
        });
  }

  userFromUsername.$inject = ['$stateParams','ceUsers'];
  function userFromUsername ($stateParams,ceUsers){
    return ceUsers.get({username: $stateParams.username}).$promise.then(function(user){
      return user;
    });
  }
})();