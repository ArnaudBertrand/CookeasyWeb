(function(){
  'use strict';
  angular
    .module('app')
    .controller('CreateRecipeCtrl', CreateRecipeCtrl);

  CreateRecipeCtrl.$inject = ['$scope', '$state', 'Upload', 'createRecipeService'];
  function CreateRecipeCtrl ($scope,$state,Upload,createRecipeService) {
    $scope.recipe = {course: {}, ingredients: [], name: '', steps: [], utensils: []};

    // List of different courses
    $scope.courses = [{name: 'Starter', value: 1}, {name: 'Main course', value: 2}, {name: 'Dessert', value: 3}];
    // Current ingredient in edition
    $scope.currentIngredient = {};
    // Current step in edition
    $scope.currentStep = {};
    // Errors
    $scope.errors = {};
    // Infomation for line step graph
    $scope.lineGraph = {width: 500, height: 30, rSize: 12};
    // Pictures upload url
    $scope.pictureUrl = 'https://mysterious-eyrie-9135.herokuapp.com/picture/upload';
    // Pictures upload tags
    $scope.pictureStepTags = ['recipe','step'];
    $scope.pictureFinalTags = ['recipe','main'];
    // Show timer for steps
    $scope.showTimer = false;
    // Steps infos for the graph
    $scope.stepsInfo = ['I','E'];

    // Show / Hide screens
    $scope.stepInformation = true;
    $scope.stepCreations = false;
    $scope.stepFinal = false;

    // Add an ingredient
    $scope.addIngredient = function (){
      $scope.errors.ingredient = {};
      var ingredient = $scope.currentIngredient;
      // Check name
      if(!ingredient.name || ingredient.name == ''){
        $scope.errors.ingredient.name = 'Please insert an ingredient name.';
      }
      // Check quantity
      if(isNaN(ingredient.qte)){
        $scope.errors.ingredient.qte = 'Quantity should be a number.';
      } else if(Number(ingredient.qte)<0){
        $scope.errors.ingredient.qte = 'Quantity should be positive.';
      }
      // Check unit
      if(!ingredient.unit || ingredient.unit == ''){
        $scope.errors.ingredient.unit = 'Please insert an ingredient unit.';
      }
      // Check for errors
      if(Object.keys($scope.errors.ingredient).length){
        return;
      }
      // Insert ingredient
      ingredient.qte = Number(ingredient.qte);
      $scope.recipe.ingredients.push(ingredient);
      $scope.currentIngredient = {};
    };

    // Add an utensil
    $scope.addUtensil = function (){
      delete $scope.errors.utensil;
      if(!$scope.currentUtensil || $scope.currentUtensil == ''){
        $scope.errors.utensil = 'Please insert ustensil name.';
      } else {
        $scope.recipe.utensils.push($scope.currentUtensil);
        $scope.currentUtensil = '';
      }
    };

    // Check recipe informations
    function checkRecipeInformation(){
      $scope.errors = {};
      // Name
      if($scope.recipe.name.length < 5){
        $scope.errors.name = 'Recipe name too short.';
      }
      // Course
      if(!($scope.recipe.course.value > 0 || $scope.recipe.course.value <= 3)){
        $scope.errors.course = 'Please choose a course.';
      }
      // Difficulty
      if(!($scope.recipe.difficulty > 0 && $scope.recipe.difficulty < 5)){
        $scope.errors.difficulty = 'Please choose a difficulty between 1 and 5.';
      }
      // Number of person
      if(!($scope.recipe.nbPerson > 0)){
        $scope.errors.nbPerson = 'Please insert a valid number of person.';
      }
      // Time
      if(!($scope.recipe.time > 0)){
        $scope.errors.time = 'Please insert a valid number of minutes.';
      }
    }

    // Check steps informations
    function checkStepInformation(){

    }

    // Delete an ingredient
    $scope.deleteIngredient = function (id){
      $scope.recipe.ingredients.splice(id,1);
    }

    // Delete an utensil
    $scope.deleteUtensil = function (id){
      $scope.recipe.utensils.splice(id,1);
    };

    // Delete current step
    $scope.deleteStep = function(){
      // Get current step number
      var stepNb = $scope.currentStep.number;
      // Go to previous step
      $scope.previousStep();
      // Remove from array only if it is already in
      if (stepNb < ($scope.recipe.steps.length+1)) {
        // Delete step
        $scope.recipe.steps.splice(stepNb-1,1);
        $scope.stepsInfo.splice(stepNb,1);
        // Change step numbers
        $scope.recipe.steps.map(function(step){
          if(step.number > stepNb-1) step.number--;
        });
        $scope.stepsInfo = $scope.stepsInfo.map(function(step){
          if(!isNaN(step) && step > stepNb-1) --step;
          return step;
        });
      }
    };

    // Go to a step
    $scope.goTo = function(id){
      console.log(id);
      var stepNb = $scope.currentStep.number || 0;
      // Check first page informations
      if(stepNb == 0){
        checkRecipeInformation();
      } else {
        checkStepInformation();
      }

      // Stop if there are some errors
      if(Object.keys($scope.errors).length){
//          return false;
      }

      // Save step
      saveStep();
      // Show information
      if(id === 'I'){
        $scope.stepInformation = true;
        $scope.stepCreations = false;
        $scope.stepFinal = false;
        $scope.currentStep = {};
      }
      // Show end
      if(id === 'E'){
        $scope.stepInformation = false;
        $scope.stepCreations = false;
        $scope.stepFinal = true;
        $scope.currentStep = {};
      }
      // Show step
      if(!isNaN(id)){
        $scope.stepInformation = false;
        $scope.stepCreations = true;
        $scope.stepFinal = false;
        $scope.currentStep = $scope.recipe.steps[id-1];
        if(typeof $scope.currentStep === "undefined"){
          $scope.currentStep = {number: id};
          $scope.stepsInfo.splice(id,0,id);
        }
      }
    }

    // Go to the last step
    $scope.lastStep = function (){
      $scope.goTo('E');
    };

    // Go to next step
    $scope.nextStep = function(){
      var stepNb = $scope.currentStep.number || 0;
      $scope.goTo(++stepNb);
    };

    // Go to previous step
    $scope.previousStep = function(){
      var stepNb = $scope.currentStep.number || 0;
      if(stepNb == 1) return $scope.goTo('I');
      $scope.goTo(--stepNb);
    };

    // Save current step
    function saveStep(){
      // Get current step number
      var stepNb = $scope.currentStep.number || 0;
      // Do not save if information screen
      if(!stepNb){
        return;
      }
      console.log(stepNb > $scope.recipe.steps.length);
      // Save current step was new
      if(stepNb > $scope.recipe.steps.length){
        $scope.recipe.steps.push($scope.currentStep);
      } else {
        $scope.recipe.steps[stepNb-1] = $scope.currentStep;
      }
    }

    $scope.setUploadedPicture = function(picture){
      $scope.uploadProgress = undefined;
      if($scope.stepCreations){
        $scope.currentStep.picture = picture;
      }
      if($scope.stepFinal){
        $scope.recipe.picture = picture;
      }
    };

    // Toggle timer display
    $scope.toggleTimer = function (){
      $scope.showTimer = !$scope.showTimer;
    };

    // Create the recipe
    $scope.createRecipe = function(){
      // Check last picture
      if(typeof $scope.recipe.picture === "undefined"){
        return $scope.errors.picture = 'Insert a picture before submitting recipe';
      }

      $scope.recipe.course = $scope.recipe.course.value;
      createRecipeService.create($scope.recipe).then(function(id){
        $state.go('displayRecipe',{id: id});
      });
    };
  }
})();
