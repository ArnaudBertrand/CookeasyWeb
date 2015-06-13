'use strict';

/**
 * @ngdoc overview
 * @name applicationApp
 * @description
 * # applicationApp
 *
 * Main module of the application.
 */
angular
  .module('applicationApp', [
    'ngAnimate',
//    'ngCookies',
    'ngFileUpload',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.router'
  ])
  .config(function ($stateProvider, $urlRouterProvider,$httpProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('searchRecipe', {
        url: '/',
        templateUrl: 'views/search-recipe.html',
        controller: 'SearchRecipeCtrl'
      })
      .state('about', {
        url: '/about',
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .state('contact', {
        url: '/contact',
        templateUrl: 'views/contact.html',
        controller: 'ContactCtrl'
      })
      .state('createRecipe', {
        url: '/recipe/create',
        templateUrl: 'views/create-recipe.html',
        controller: 'CreateRecipeCtrl'
      })
      .state('displayRecipe', {
        url: '/recipe/display/:id',
        templateUrl: 'views/display-recipe.html',
        controller: 'DisplayRecipeCtrl'
      });

    $httpProvider.interceptors.push('TokenInterceptor');
  })
  .config(['$httpProvider', function($httpProvider) {
      $httpProvider.defaults.useXDomain = true;
      delete $httpProvider.defaults.headers.common['X-Requested-With'];
    }]);
  // .run(['$rootScope', '$cookieStore', '$http',
  //   function ($rootScope, $cookieStore, $http) {
  //     // keep user logged in after page refresh
  //     $rootScope.globals = $cookieStore.get('globals') || {};
  //     if ($rootScope.globals.currentUser) {
  //       $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
  //     }
  //   }]);
