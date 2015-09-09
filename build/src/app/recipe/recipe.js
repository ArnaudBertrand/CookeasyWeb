(function() {
  'use strict';

  angular.module('app.recipe', ['ui.router','app.recipe.create','app.recipe.display','app.recipe.search'])
      .config(config);

  config.$inject = ['$stateProvider'];
  function config($stateProvider) {
    $stateProvider
        .state('recipeCreate', {
          url: '/recipe/create',
          views: {
            "main": {
              controller: 'RecipeCreateCtrl',
              controllerAs: 'rcpCreate',
              templateUrl: 'recipe/create/create.tpl.html'
            }
          },
          data: {pageTitle: 'Create a recipe'}
        })
        .state( 'recipeDisplay', {
          url: '/recipe/display/:id',
          views: {
            "main": {
              controller: 'RecipeDisplayCtrl',
              controllerAs: 'rcpDisplay',
              templateUrl: 'recipe/display/display.tpl.html',
              resolve: {
                recipePre: recipePre
              }
            }
          },
          data:{ pageTitle: 'View recipe' }
        })
        .state( 'recipeSearch', {
          url: '/',
          views: {
            "main": {
              controller: 'RecipeSearchCtrl',
              controllerAs: 'rcpSearch',
              templateUrl: 'recipe/search/search.tpl.html',
              resolve: {
                recipesTrendsPre: recipesTrendsPre
              }
            }
          },
          data:{ pageTitle: 'Search recipes' }
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
})();