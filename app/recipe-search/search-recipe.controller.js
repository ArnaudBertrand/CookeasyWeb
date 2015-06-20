(function (){
  'use strict';

  angular
    .module('app')
    .controller('SearchRecipeCtrl', SearchRecipeCtrl);

  SearchRecipeCtrl.$inject = ['$state','recipesTrendsPre','searchRecipeService'];

  function SearchRecipeCtrl ($state,recipesTrendsPre,searchRecipeService) {
    var vm = this;

    vm.recipes = [];
    vm.trends = [];
    vm.recipes = recipesTrendsPre;
    vm.displayRecipe = displayRecipe;
    vm.isPair = isPair;
    vm.search = search;

    function displayRecipe (id){
      $state.go('displayRecipe',{id: id});
    }

    function isPair (index){
      return index%2 === 0;
    }

    function search (){
      if(vm.recipeToSearch.length){
        searchRecipeService.search(vm.recipeToSearch).then(function(recipes){
          vm.recipes = recipes;
        });
      } else {
        vm.recipes = $scope.trends;
      }
    }
  }
})();
