(function(){
  'use strict';

  angular
      .module(
        'app', [
        'templates-app',
        'templates-common',
        'app.game',
        'app.login',
        'app.profile',
        'app.recipe',
        'app.register',
        'ngFileUpload',
        'ngResource',
        'ui.router',
        'wu.masonry'
      ]).config(myAppConfig)
      .config(authentication)
      .run(function run(){})
      .controller('AppCtrl',AppCtrl);

  authentication.$inject = ['$httpProvider'];
  function authentication($httpProvider){
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
  }

  myAppConfig.$inject = ['$urlRouterProvider','$httpProvider'];
  function myAppConfig ($urlRouterProvider,$httpProvider) {
    $urlRouterProvider.otherwise('/');
    $httpProvider.interceptors.push('TokenInterceptor');
  }

  AppCtrl.$inject = ['$scope'];
  function AppCtrl ( $scope ) {
    var vm = this;
    vm.pageTitle = 'Cookeasy';

    $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
      if ( angular.isDefined( toState.data.pageTitle ) ) {
        vm.pageTitle = toState.data.pageTitle + ' | Cookeasy ';
      }
    });
  }
})();
