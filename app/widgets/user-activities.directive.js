(function(){
  'use strict';

  angular
    .module('app')
    .directive('userActivities',userActivities);

  function userActivities() {
    return {
      templateUrl: '/widgets/user-activities.html',
      restrict: 'E',
      scope: {
        activities: '=',
        userPicture: '='
      },
      controller: UserActivitiesCtrl,
      controllerAs: 'userActivities',
      bindToController: true
    };
  }

  function UserActivitiesCtrl (){
    var vm = this;

    vm.getPicture = getPicture;

    function getPicture(pic){
      return pic ? pic: vm.userPicture;
    }
  }
})();
