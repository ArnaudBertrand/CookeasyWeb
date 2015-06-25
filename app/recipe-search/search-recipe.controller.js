(function (){
  'use strict';

  angular
    .module('app')
    .controller('RecipeSearchCtrl', RecipeSearchCtrl);

  RecipeSearchCtrl.$inject = ['$state','recipesTrendsPre','recipeSearchService'];

  function RecipeSearchCtrl ($state,recipesTrendsPre,recipeSearchService) {
    var vm = this;

    vm.recipes = [];
    vm.trends = [];
    vm.recipes = recipesTrendsPre;
    vm.displayRecipe = displayRecipe;
    vm.isPair = isPair;
    vm.search = search;

    function displayRecipe (id){
      $state.go('recipeDisplay',{id: id});
    }

    function isPair (index){
      return index%2 === 0;
    }

    function search (){
      if(vm.recipeToSearch.length){
        recipeSearchService.search(vm.recipeToSearch).then(function(recipes){
          vm.recipes = recipes;
        });
      } else {
        vm.recipes = $scope.trends;
      }
    }
  }
})();
