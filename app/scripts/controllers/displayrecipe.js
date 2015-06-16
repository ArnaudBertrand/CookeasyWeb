'use strict';

/**
 * @ngdoc function
 * @name applicationApp.controller:DisplayRecipeCtrl
 * @description
 * # DisplayRecipeCtrl
 * Controller of the applicationApp
 */
angular.module('applicationApp')
.controller('DisplayRecipeCtrl', ['$scope', '$stateParams','$timeout', 'RecipeService', 'ModalWindow','Upload',
  function ($scope, $stateParams, $timeout, RecipeService, ModalWindow, Upload) {
    // Current step
    $scope.currentStep = {};
    // Errors
    $scope.errors = {};
    // Line graph
    $scope.lineGraph = {width: 500, height: 30, rSize: 12};
    // Mark for the recipe
    $scope.mark = 0;
    // Pictures upload url
    $scope.picturesUploadUrl = '';
    // Pictures upload tags
    $scope.picturesUploadTags = [];
    // Current recipe
    $scope.recipe = {};
    // Show infoPage
    $scope.showInfoPage = true;
    // Steps infos for the graph
    $scope.stepsInfo = [];
    // Temporary mark to be displayed
    $scope.tempMark = 0;
    // Seconds passed for timer
    $scope.timerSecondsPassed = 0;

    // Get recipe information
    RecipeService.get($stateParams.id).then(function(recipe){
      $scope.recipe = recipe;

      // Url and tags for uploading picture
      $scope.picturesUploadUrl = 'https://mysterious-eyrie-9135.herokuapp.com/recipe/pictures/upload/'+$scope.recipe._id;
      $scope.picturesUploadTags = ['recipe,users' + $scope.recipe._id];

      // Create step info for navigation step line
      $scope.stepsInfo = ['I'];
      var i;
      for (i = 0; i < $scope.recipe.steps.length; i++) {
        $scope.stepsInfo.push(i+1);
      }
      $scope.stepsInfo.push("E");
    });

    // Add a comment to the recipe
    $scope.addComment = function(){
      var comment = {};

      // Check variables
      comment.message = typeof $scope.currentComment === "string" ? $scope.currentComment.trim() : '';
      if($scope.mark != 0){
        comment.mark = $scope.mark;
      }

      // Check length
      if(comment.message.length > 10){
        RecipeService.addComment($stateParams.id,comment).then(function(comment){
          $scope.recipe.comments.unshift(comment);
          $scope.currentComment = "";
        });
      } else {
        $scope.errors.addComment = 'Please enter at least 10 characters';
      }
    };

    // Call back after picture is uploaded
    $scope.afterPictureUpload = function(picture){
      $scope.recipe.pictures.push(picture);
      $scope.done = true;
    }

    // Events on marking recipe
    $scope.markEvent = {
      mouseEnter:  function(add,index){
        if(add){
          $scope.tempMark += index + 1;
        } else {
          $scope.tempMark = index+1;
        }
      },
      mouseLeave: function(){
        $scope.tempMark = $scope.mark;
      },
      mouseUp: function(){
        $scope.mark = $scope.tempMark;
      }
    };

    // Change screen or step
    $scope.goTo = function(id){
      // Reset timer
      $scope.timerSecondsPassed = 0;
      // Back to info
      if(id === $scope.stepsInfo[0]){
        $scope.showInfoPage = true;
        $scope.showStep = false;
        $scope.stepsFinished = false;
        return $scope.currentStep = {};
      }
      // Go to last step
      if(id === $scope.stepsInfo[$scope.stepsInfo.length-1]){
        $scope.showInfoPage = false;
        $scope.showStep = false;
        $scope.stepsFinished = true;
        return $scope.currentStep = {number: 'E'};
      }
      // Normal steps
      $scope.showInfoPage = false;
      $scope.showStep = true;
      $scope.stepsFinished = false;
      $scope.currentStep = $scope.recipe.steps[id-1];
    };

    // Next step
    $scope.nextStep = function(){
      // Get current step number
      var stepNb = $scope.currentStep.number || 0;
      if(stepNb < ($scope.recipe.steps.length)){
        $scope.goTo(stepNb+1);
      } else{
        $scope.goTo('E');
      }
    };

    // Open gallery modal window
    $scope.openGallery = function(index){
      ModalWindow.openGallery(index,$scope.recipe.pictures);
    };

    // Previous step
    $scope.previousStep = function(){
      // Get current step number
      var stepNb = $scope.currentStep.number || 0;
      if(stepNb > 1){
        $scope.goTo(stepNb-1);
      } else {
        $scope.goTo('I');
      }
    };

    // Show the main picture on click
    $scope.showMainPicture = function(){
      ModalWindow.openGallery(0,[{url: $scope.recipe.picture.url}]);
    };

    var timer;
    // Pause timer
    $scope.timerPause = function(){
      $scope.timerRunning = false;
      $timeout.cancel(timer);
    }
    // Start timer
    $scope.timerStart = function(){
      timer = $timeout($scope.timerTick,1000);
      $scope.timerRunning = true;
    };
    // Stop timer
    $scope.timerStop = function(){
      $scope.timerRunning = false;
      $timeout.cancel(timer);
      $scope.timerSecondsPassed = 0;
    };
    // Update timer each seconds
    $scope.timerTick = function(){
      $scope.timerSecondsPassed++;
      if($scope.timerSecondsPassed == $scope.currentStep.time*60){
        return $scope.timerStop();
      }
      timer = $timeout($scope.timerTick,1000);
    };

  }]);
