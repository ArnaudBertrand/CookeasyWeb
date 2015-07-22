(function(){
  'use strict';
  angular
    .module('app')
    .controller('GameCreateQuizCtrl', GameCreateQuizCtrl);

  GameCreateQuizCtrl.$inject = ['$state','ceGamesQuizzes'];
  function GameCreateQuizCtrl($state,ceGamesQuizzes){
    var vm = this;

    /** Navigation **/
    vm.deleteQuestion = deleteQuestion;
    vm.goTo = goTo;
    vm.infoPage = true;
    vm.lineGraph = {width: 500, height: 30, rSize: 12};
    vm.nextQuestion = nextQuestion;
    vm.qNb = 0;
    vm.questionsInfos = ['I'];
    /** Quiz **/
    vm.addAnswer = addAnswer;
    vm.createGame = createGame;
    vm.currentQuestion = {type: 'text', answers: []};
    vm.currentAnswer = {};
    vm.errors = {};
    vm.pictureUrl = 'https://mysterious-eyrie-9135.herokuapp.com/pictures';
    vm.quiz = {questions: []};
    /** Info **/
    vm.pictureInfoTags = ['quiz','main'];
    vm.setUploadedPictureInfo = setUploadedPictureInfo;
    /** Question **/
    vm.pictureQuestionTags = ['quiz','question'];
    vm.setUploadedPictureQuestion = setUploadedPictureQuestion;
    /** Answer **/
    vm.pictureAnswerTags = ['quiz','answer'];
    vm.resetAnswer = resetAnswer;
    vm.setUploadedPictureAnswer = setUploadedPictureAnswer;

    function addAnswer(correct){
      if(correct) vm.currentAnswer.correct = true;
      vm.currentQuestion.answers.push(vm.currentAnswer);
      vm.currentAnswer = {};
    }

    function createGame(){
      saveStep();
      ceGamesQuizzes.saveAndGetId(vm.quiz).$promise.then(function(res){
        $state.go('gameDisplayQuiz',{id: res.id});
      });
    }

    function deleteQuestion(){
      // Go to previous step
      goTo(vm.qNb-1);
      // Remove from array only if it is already in
      if (vm.qNb < vm.quiz.questions.length) {
        vm.quiz.questions.splice(vm.qNb,1);
        vm.questionsInfos.splice(vm.qNb+1,1);
        // Change step numbers
        vm.questionsInfos= vm.questionsInfos.map(function(q){
          return (!isNaN(q) && q > vm.qNb) ? --q: q;
        });
      }
    }

    function goTo(id){
      // Check first page informations
      if(vm.qNb == 0){
//TODO
//        checkRecipeInformation();
      } else {
//TODO
//        checkStepInformation();
      }

      // Stop if there are some errors
      if(Object.keys(vm.errors).length){
        return false;
      }

      // Save step
      saveStep();
      // Show information
      if(id === 'I'){
        vm.infoPage = true;
        vm.currentQuestion = {};
        return vm.qNb = 0;
      }
      // Show step
      if(!isNaN(id)){
        vm.infoPage = false;
        var previousType = vm.currentQuestion.type;
        vm.currentQuestion = vm.quiz.questions[id-1];
        if(typeof vm.currentQuestion === "undefined"){
          vm.currentQuestion = {type: previousType, answers: []};
          vm.questionsInfos.splice(id,0,id);
        }
        vm.qNb = id;
      }
    }

    function nextQuestion(){
      goTo(vm.qNb+1);
    }

    function resetAnswer(){
      vm.currentQuestion.answers = [];
    }

    function saveStep(){
      // Do not save if information screen
      if(!vm.qNb){
        return;
      }
      // Save current question if new or edit previous
      if(vm.qNb > vm.quiz.questions.length){
        vm.quiz.questions.push(vm.currentQuestion);
      } else {
        vm.quiz.questions[vm.qNb-1] = vm.currentQuestion;
      }
    }

    function setUploadedPictureAnswer(picture){
      vm.uploadProgress = undefined;
      vm.currentAnswer.picture = picture;
    }
    function setUploadedPictureInfo(picture){
      vm.uploadProgress = undefined;
      vm.quiz.picture = picture;
    }
    function setUploadedPictureQuestion(picture){
      vm.uploadProgress = undefined;
      vm.currentQuestion.picture = picture;
    }
  }
})();
