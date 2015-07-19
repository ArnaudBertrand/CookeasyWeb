(function(){
  'use strict';

  angular
    .module('app')
    .directive('menuLeft',menuLeft);

  function menuLeft () {
    return {
      templateUrl: '/layout/menu-left.html',
      restrict: 'E',
      replace: true,
      controller: MenuLeftCtrl,
      controllerAs: 'menuLeft'
    };
  }

  MenuLeftCtrl.$inject = ['$rootScope','$state','ceAuthentication'];
  function MenuLeftCtrl($rootScope,$state,ceAuthentication){
    var vm = this;

    vm.goToCreateGame = goToCreateGame;
    vm.goToCreateRecipe = goToCreateRecipe;
    vm.goToProfile = goToProfile;
    vm.opened = false;
    vm.toggleDisplay = toggleDisplay;

    function userConnected(){
      var user = ceAuthentication.getUser();
      if(!user){
        toggleDisplay();
        $state.go('login');
        return false;
      }
      return user;
    }

    function goToCreateGame(){
      if(userConnected()){
        toggleDisplay();
        $state.go('gameCreateQuiz');
      }
    }

    function goToCreateRecipe(){
      if(userConnected()){
        toggleDisplay();
        $state.go('recipeCreate');
      }
    }
    function goToProfile(){
      var user = userConnected();
      if(user){
        console.log(user);
        toggleDisplay();
        $state.go('profileView',{username: user.username});
      }
    }

    function toggleDisplay(){
      vm.opened = !vm.opened;
      $rootScope.bodyPush = vm.opened;
    }
  }
})();
