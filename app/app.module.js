(function(){
  'use strict';

  angular
    .module('app',[
      'ngAnimate',
  //    'ngCookies',
      'ngFileUpload',
      'ngResource',
      'ngRoute',
      'ngSanitize',
      'ngTouch',
      'ui.router',
      'wu.masonry'
    ])
    .config(configure)
    .config(auth);

  configure.$inject = [
    '$stateProvider',
    '$urlRouterProvider',
    '$httpProvider'
    ];


  function configure ($stateProvider, $urlRouterProvider,$httpProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('recipeDisplay', {
        url: '/recipe/display/:id',
        templateUrl: '/recipe-display/display-recipe.html',
        controller: 'RecipeDisplayCtrl',
        controllerAs: 'rcpDisplay',
        resolve: {
          recipePre: recipePre
        }
      })
      .state('login', {
        url: '/login',
        templateUrl: '/login/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'login'
      })
      .state('recipeCreate', {
        url: '/recipe/create',
        templateUrl: '/recipe-create/create-recipe.html',
        controller: 'RecipeCreateCtrl',
        controllerAs: 'rcpCreate'
      })
      .state('recipeSearch', {
        url: '/',
        templateUrl: '/recipe-search/search-recipe.html',
        controller: 'RecipeSearchCtrl',
        controllerAs: 'rcpSearch',
        resolve: {
          recipesTrendsPre: recipesTrendsPre
        }
      })
      .state('register', {
        url: '/register',
        templateUrl: '/signup/signup.html',
        controller: 'SignupCtrl',
        controllerAs: 'signup'
      })
      .state('viewProfile',{
        url: '/user/:username',
        templateUrl: '/profile-view/view-profile.html',
        controller: 'ViewProfileCtrl',
        controllerAs: 'profView',
        resolve: {
          userPre: userFromUserName
        }
      });

    $httpProvider.interceptors.push('TokenInterceptor');
  }

  auth.$inject = ['$httpProvider'];
  function auth ($httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
  }

  recipePre.$inject = ['$filter','$stateParams','recipeDisplayService'];
  function recipePre ($filter,$stateParams,recipeDisplayService){
    return recipeDisplayService.get($stateParams.id).then(function(recipe){
      $filter('orderObjectBy')(recipe.pictures,'createdOn',-1);
      return recipe;
    });
  }

  recipesTrendsPre.$inject = ['recipeSearchService'];
  function recipesTrendsPre (recipeSearchService){
    return recipeSearchService.getTrends();
  }

  userFromUserName.$inject = ['$stateParams','$resource'];
  function userFromUserName ($stateParams,$resource){
    var User = $resource('http://mysterious-eyrie-9135.herokuapp.com/user/:username');
    return User.get({username: $stateParams.username}).$promise.then(function(res){
      return res.user;
    });
  }
})();
