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
      .state('searchRecipe', {
        url: '/',
        templateUrl: '/recipe-search/search-recipe.html',
        controller: 'SearchRecipeCtrl',
        controllerAs: 'searchRecipe',
        resolve: {
          recipesTrendsPre: recipesTrendsPre
        }
      })
      .state('createRecipe', {
        url: '/recipe/create',
        templateUrl: '/recipe-create/create-recipe.html',
        controller: 'CreateRecipeCtrl',
        controllerAs: 'rcpCreate'
      })
      .state('displayRecipe', {
        url: '/recipe/display/:id',
        templateUrl: '/recipe-display/display-recipe.html',
        controller: 'DisplayRecipeCtrl',
        controllerAs: 'display',
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
      .state('register', {
        url: '/register',
        templateUrl: '/signup/signup.html',
        controller: 'SignupCtrl',
        controllerAs: 'signup',
      })
      .state('viewProfile',{
        url: '/user/:id',
        templateUrl: '/profile-view/view-profile.html',
        controller: 'ViewProfileCtrl',
        controllerAs: 'profView'
      });

    $httpProvider.interceptors.push('TokenInterceptor');
  }

  auth.$inject = ['$httpProvider'];
  function auth ($httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
  }

  recipePre.$inject = ['$filter','$stateParams','displayRecipeService'];
  function recipePre ($filter,$stateParams,displayRecipeService){
    return displayRecipeService.get($stateParams.id).then(function(recipe){
      $filter('orderObjectBy')(recipe.pictures,'createdOn',-1);
      return recipe;
    });
  }

  recipesTrendsPre.$inject = ['searchRecipeService'];
  function recipesTrendsPre (searchRecipeService){
    return searchRecipeService.getTrends();
  }
})();
