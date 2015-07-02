(function(){
  'use strict';
  angular
    .module('app')
    .controller('RecipeCreateCtrl', RecipeCreateCtrl);

  RecipeCreateCtrl.$inject = ['$state','ceRecipes'];
  function RecipeCreateCtrl($state,ceRecipes){
    var vm = this;

    /** Navigation **/
    vm.goTo = goTo;
    vm.lastStep = lastStep;
    vm.nextStep = nextStep;
    vm.previousStep = previousStep;
    vm.stepInformation = true;
    vm.stepCreations = false;
    vm.stepFinal = false;
    /** Recipe **/
    vm.createRecipe = createRecipe;
    vm.courses = [{name: 'Starter', value: 1}, {name: 'Main course', value: 2}, {name: 'Dessert', value: 3}];
    vm.errors = {};
    vm.recipe = {course: {}, ingredients: [], name: '', steps: [], utensils: []};
    /** Ingredients **/
    vm.addIngredient = addIngredient;
    vm.currentIngredient = {};
    vm.deleteIngredient = deleteIngredient;
    /** Utensil **/
    vm.addUtensil = addUtensil;
    vm.deleteUtensil = deleteUtensil;
    /** Steps **/
    vm.currentStep = {};
    vm.deleteStep = deleteStep;
    vm.lineGraph = {width: 500, height: 30, rSize: 12};
    vm.showTimer = false;
    vm.stepsInfo = ['I','E'];
    vm.toggleTimer = toggleTimer;
    /** Picture upload **/
    vm.pictureFinalTags = ['recipe','main'];
    vm.pictureStepTags = ['recipe','step'];
    vm.pictureUrl = 'https://mysterious-eyrie-9135.herokuapp.com/pictures';
    vm.setUploadedPicture = setUploadedPicture;

    function addIngredient(){
      vm.errors.ingredient = {};
      var ingredient = vm.currentIngredient;
      // Check name
      if(!ingredient.name || ingredient.name == ''){
        vm.errors.ingredient.name = 'Please insert an ingredient name.';
      }
      // Check quantity
      if(ingredient.qte){
        console.log('test');
      } else {
        console.log(ingredient);
      }
      if(ingredient.qte && (isNaN(ingredient.qte) || Number(ingredient.qte)<0)){
        console.log('test');
        vm.errors.ingredient.qte = 'Quantity should be a positive number.';
      }
      // Check unit
      if(ingredient.unit && !ingredient.qte){
        vm.errors.ingredient.unit = 'Unit should be used with quantity.';
      }
      // Check for errors
      if(Object.keys(vm.errors.ingredient).length){
        return;
      }
      // Insert ingredient
      vm.recipe.ingredients.push(ingredient);
      vm.currentIngredient = {};
    }

    function addUtensil(){
      delete vm.errors.utensil;
      if(!vm.currentUtensil || vm.currentUtensil == ''){
        vm.errors.utensil = 'Please insert ustensil name.';
      } else {
        vm.recipe.utensils.push(vm.currentUtensil);
        vm.currentUtensil = '';
      }
    }

    function checkRecipeInformation(){
      vm.errors = {};
      // Name
      if(vm.recipe.name.length < 5){
        vm.errors.name = 'Recipe name too short.';
      }
      // Course
      if(!(vm.recipe.course.value > 0 && vm.recipe.course.value <= 3)){
        vm.errors.course = 'Please choose a course.';
      }
      // Difficulty
      if(!(vm.recipe.difficulty > 0 && vm.recipe.difficulty < 5)){
        vm.errors.difficulty = 'Please choose a difficulty between 1 and 5.';
      }
      // Ingredients
      if(!vm.recipe.ingredients.length){
        vm.errors.ingredients = 'Please add at least one ingredient';
      }
      // Number of person
      if(!(vm.recipe.nbPerson > 0)){
        vm.errors.nbPerson = 'Please insert a valid number of person.';
      }
      // Time
      if(!(vm.recipe.time > 0)){
        vm.errors.time = 'Please insert a valid number of minutes.';
      }
    }

    function checkStepInformation(){

    }

    function deleteIngredient(id){
      vm.recipe.ingredients.splice(id,1);
    }

    function deleteUtensil(id){
      vm.recipe.utensils.splice(id,1);
    }

    function deleteStep(){
      // Get current step number
      var stepNb = vm.currentStep.number;
      // Go to previous step
      vm.previousStep();
      // Remove from array only if it is already in
      if (stepNb < (vm.recipe.steps.length+1)) {
        // Delete step
        vm.recipe.steps.splice(stepNb-1,1);
        vm.stepsInfo.splice(stepNb,1);
        // Change step numbers
        vm.recipe.steps.map(function(step){
          if(step.number > stepNb-1) step.number--;
        });
        vm.stepsInfo = vm.stepsInfo.map(function(step){
          if(!isNaN(step) && step > stepNb-1) --step;
          return step;
        });
      }
    }

    function goTo(id){
      var stepNb = vm.currentStep.number || 0;
      // Check first page informations
      if(stepNb == 0){
        checkRecipeInformation();
      } else {
        checkStepInformation();
      }

      // Stop if there are some errors
      if(Object.keys(vm.errors).length){
        return false;
      }

      // Save step
      saveStep();
      // Show information
      if(id === 'I'){
        vm.stepInformation = true;
        vm.stepCreations = false;
        vm.stepFinal = false;
        vm.currentStep = {};
      }
      // Show end
      if(id === 'E'){
        vm.stepInformation = false;
        vm.stepCreations = false;
        vm.stepFinal = true;
        vm.currentStep = {};
      }
      // Show step
      if(!isNaN(id)){
        vm.stepInformation = false;
        vm.stepCreations = true;
        vm.stepFinal = false;
        vm.currentStep = vm.recipe.steps[id-1];
        if(typeof vm.currentStep === "undefined"){
          vm.currentStep = {number: id};
          vm.stepsInfo.splice(id,0,id);
        }
      }
    }

    function lastStep(){
      vm.goTo('E');
    }

    function nextStep(){
      var stepNb = vm.currentStep.number || 0;
      vm.goTo(++stepNb);
    }

    function previousStep(){
      var stepNb = vm.currentStep.number || 0;
      if(stepNb == 1) return vm.goTo('I');
      vm.goTo(--stepNb);
    }

    function saveStep(){
      // Get current step number
      var stepNb = vm.currentStep.number || 0;
      // Do not save if information screen
      if(!stepNb){
        return;
      }
      // Save current step was new
      if(stepNb > vm.recipe.steps.length){
        vm.recipe.steps.push(vm.currentStep);
      } else {
        vm.recipe.steps[stepNb-1] = vm.currentStep;
      }
    }

    function setUploadedPicture(picture){
      vm.uploadProgress = undefined;
      if(vm.stepCreations){
        vm.currentStep.picture = picture;
      }
      if(vm.stepFinal){
        vm.recipe.picture = picture;
      }
    }

    function toggleTimer(){
      vm.showTimer = !vm.showTimer;
    }

    function createRecipe(){
      // Check last picture
      if(typeof vm.recipe.picture === "undefined"){
        return vm.errors.picture = 'Insert a picture before submitting recipe';
      }

      vm.recipe.course = vm.recipe.course.value;
      ceRecipes.saveAndGetId(vm.recipe).$promise.then(function(res){
        $state.go('recipeDisplay',{id: res.id});
      });
    }
  }
})();
