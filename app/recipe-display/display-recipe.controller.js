(function(){
  'use strict';

  angular
    .module('app')
    .controller('RecipeDisplayCtrl', RecipeDisplayCtrl);

  RecipeDisplayCtrl.$inject = ['$http','$stateParams','$timeout','recipePre','ceRecipesComments','ceModalGallery'];
  function RecipeDisplayCtrl($http,$stateParams,$timeout,recipePre,ceRecipesComments,ceModalGallery){
    /* jshint validthis: true */
    var vm = this;

    /** Navigation **/
    vm.goTo = goTo;
    vm.lineGraph = {width: 500, height: 30, rSize: 12};
    vm.nextStep = nextStep;
    /** Recipe info **/
    vm.like = like;
    vm.recipe = recipePre;
    vm.showInfoPage = true;
    /** Handle picture display **/
    vm.openGallery = openGallery;
    /** Handle picture upload **/
    vm.afterPictureUpload = afterPictureUpload;
    vm.errors = {};
    vm.previousStep = previousStep;
    vm.picturesUploadUrl = 'https://mysterious-eyrie-9135.herokuapp.com/recipe/pictures/upload/'+$stateParams.id;
    vm.picturesUploadTags = ['recipe,users' + $stateParams.id];
    vm.showMainPicture = showMainPicture;
    /** Handle steps **/
    vm.currentStep = {};
    vm.stepsInfo = [];
    vm.timerSecondsPassed = 0;
    vm.timerPause = timerPause;
    vm.timerStart = timerStart;
    vm.timerStop = timerStop;
    var timer;
    /** Comments **/
    vm.addComment = addComment;
    vm.mark = 0;
    vm.markEvent = {
      mouseUp : markMouseUp,
      mouseLeave: markMouseLeave,
      mouseEnter: markMouseEnter
    };
    vm.tempMark = 0;


    activate();

    function activate (){
      vm.stepsInfo = ['I'];
      for (var i = 0; i < vm.recipe.steps.length; i++) {
        vm.stepsInfo.push(i+1);
      }
      vm.stepsInfo.push("E");
    }

    function addComment (){
      var comment = {};

      // Check variables
      comment.message = typeof vm.currentComment === "string" ? vm.currentComment.trim() : '';
      if(vm.mark != 0){
        comment.mark = vm.mark;
      }

      // Check length
      if(comment.message.length > 10){
        vm.commentAdding = true;

        ceRecipesComments.save({recipeId: $stateParams.id},comment).$promise.then(function(comment){
          vm.recipe.comments.unshift(comment);
          vm.currentComment = "";
          vm.commentAdded = true;
          delete vm.commentAdding;
        });
      } else {
        vm.errors.addComment = 'Please enter at least 10 characters';
        delete vm.commentAdding;
      }
    }

    function afterPictureUpload (picture){
      vm.recipe.pictures.unshift(picture);
      vm.done = true;
    }

    function markMouseEnter(add,index){
      if(add){
        vm.tempMark += index + 1;
      } else {
        vm.tempMark = index+1;
      }
    }

    function markMouseLeave(){
      vm.tempMark = vm.mark;
    }

    function markMouseUp(){
      vm.mark = vm.tempMark;
    }

    function goTo(id){
      // Reset timer
      vm.timerSecondsPassed = 0;
      // Back to info
      if(id === vm.stepsInfo[0]){
        vm.showInfoPage = true;
        vm.showStep = false;
        vm.stepsFinished = false;
        return vm.currentStep = {};
      }
      // Go to last step
      if(id === vm.stepsInfo[vm.stepsInfo.length-1]){
        vm.showInfoPage = false;
        vm.showStep = false;
        vm.stepsFinished = true;
        return vm.currentStep = {number: 'E'};
      }
      // Normal steps
      vm.showInfoPage = false;
      vm.showStep = true;
      vm.stepsFinished = false;
      vm.currentStep = vm.recipe.steps[id-1];
    }

    function like(){
      if(!vm.liked){
        $http.put('https://mysterious-eyrie-9135.herokuapp.com/recipes/' + vm.recipe._id + '/like',{}).success(function(){
          console.log('test');
          vm.liked = true;
        }).error(function(err){
          console.log(err);
        });
      }
    }

    function nextStep (){
      // Get current step number
      var stepNb = vm.currentStep.number || 0;
      if(stepNb < (vm.recipe.steps.length)){
        vm.goTo(stepNb+1);
      } else{
        vm.goTo('E');
      }
    }

    function openGallery (index){
      ceModalGallery.openGallery(index,vm.recipe.pictures);
    }

    function previousStep (){
      // Get current step number
      var stepNb = vm.currentStep.number || 0;
      if(stepNb > 1){
        vm.goTo(stepNb-1);
      } else {
        vm.goTo('I');
      }
    }

    function showMainPicture (){
      ceModalGallery.openGallery(0,[{url: vm.recipe.picture}]);
    }

    /** Timer functions **/
    function timerPause (){
      vm.timerRunning = false;
      $timeout.cancel(timer);
    }

    function timerStart (){
      timer = $timeout(timerTick,1000);
      vm.timerRunning = true;
    }

    function timerStop (){
      vm.timerRunning = false;
      $timeout.cancel(timer);
      vm.timerSecondsPassed = 0;
    }

    function timerTick (){
      vm.timerSecondsPassed++;
      if(vm.timerSecondsPassed == vm.currentStep.time*60){
        return vm.timerStop();
      }
      timer = $timeout(timerTick,1000);
    }
  }
})();
