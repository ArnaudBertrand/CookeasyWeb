'use strict';

/**
 * @ngdoc function
 * @name applicationApp.controller:SearchRecipeCtrl
 * @description
 * # SearchRecipeCtrl
 * Controller of the applicationApp
 */
angular.module('applicationApp')
  .controller('SearchRecipeCtrl', ['$scope', '$state', 'RecipeService',
    function ($scope, $state, RecipeService) {
      $scope.recipes = [];

      $scope.displayRecipe = function (id){
        $state.go('displayRecipe',{id: id});
      };

      $scope.isPair = function(index){
        return index%2 === 0;
      };

      $scope.search = function(){
        RecipeService.search($scope.recipeToSearch).then(function(res){
          $scope.recipes = res;
          console.log(res);
        });
      };
  }]);
