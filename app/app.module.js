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
      .state('gameCreateQuiz', {
        url: '/game/create/quiz',
        templateUrl: '/game-create/create-quiz.html',
        controller: 'GameCreateQuizCtrl',
        controllerAs: 'quizCreate'
      })
      .state('gameDisplayQuiz', {
        url: '/game/display/quiz/:id',
        templateUrl: '/game-display/display-quiz.html',
        controller: 'GameDisplayQuizCtrl',
        controllerAs: 'quizDisplay',
        resolve: {
          quizPre: quizPre
        }
      })
      .state('gameSearch', {
        url: '/game/search',
        templateUrl: '/game-search/search-game.html',
        controller: 'GameSearchCtrl',
        controllerAs: 'gameSearch',
        resolve: {
          gamesPre: gamesPre
        }
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
      .state('profileView',{
        url: '/user/:username',
        templateUrl: '/profile-view/view-profile.html',
        controller: 'ViewProfileCtrl',
        controllerAs: 'profView',
        resolve: {
          userPre: userFromUsername
        }
      })
      .state('profileEdit',{
        url: '/user/edit/:username',
        templateUrl: '/profile-edit/edit-profile.html',
        controller: 'EditProfileCtrl',
        controllerAs: 'profEdit',
        resolve: {
          userPre: userFromUsername
        }
      });

    $httpProvider.interceptors.push('TokenInterceptor');
  }

  auth.$inject = ['$httpProvider'];
  function auth ($httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
  }

  gamesPre.$inject = ['ceGames'];
  function gamesPre (ceGames){
    return ceGames.query().$promise.then(function(games){
      return games;
    });
  }

  quizPre.$inject = ['$stateParams','ceGames'];
  function quizPre ($stateParams,ceGames){
    return ceGames.get({id: $stateParams.id}).$promise.then(function(quiz){
      return quiz;
    });
  }

  recipePre.$inject = ['$filter','$stateParams','ceRecipes'];
  function recipePre ($filter,$stateParams,ceRecipes){
    return ceRecipes.get({id: $stateParams.id}).$promise.then(function(recipe){
      $filter('orderObjectBy')(recipe.pictures,'createdOn',-1);
      return recipe;
    });
  }

  recipesTrendsPre.$inject = ['ceRecipes'];
  function recipesTrendsPre (ceRecipes){
    return ceRecipes.query().$promise.then(function(recipes){
      return recipes;
    });
  }

  userFromUsername.$inject = ['$stateParams','ceUsers'];
  function userFromUsername ($stateParams,ceUsers){
    return ceUsers.get({username: $stateParams.username}).$promise.then(function(user){
      return user;
    });
  }
})();
