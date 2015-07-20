(function (){
  'use strict';

  angular
    .module('app')
    .controller('RecipeSearchCtrl', RecipeSearchCtrl);

  RecipeSearchCtrl.$inject = ['$state','recipesTrendsPre','ceRecipes'];

  function RecipeSearchCtrl ($state,recipesTrendsPre,ceRecipes) {
    var vm = this;

    vm.recipes = [];
    vm.trends = recipesTrendsPre;
    vm.recipes = recipesTrendsPre;
    vm.displayRecipe = displayRecipe;
    vm.search = search;

    function displayRecipe (id){
      $state.go('recipeDisplay',{id: id});
    }

    function search (){
      if(vm.recipeToSearch.length){
        ceRecipes.query({match: vm.recipeToSearch}).$promise.then(function(recipes){
          vm.recipes = recipes;
        });
      } else {
        vm.recipes = vm.trends;
      }
    }
  }
})();
