(function(){
  'use strict';
  angular
    .module('app')
    .controller('GameCreateQuizCtrl', GameCreateQuizCtrl);

  GameCreateQuizCtrl.$inject = ['$state','ceGamesQuizzes'];
  function GameCreateQuizCtrl($state,ceGamesQuizzes){
    var vm = this;

    /** Navigation **/
    vm.goTo = goTo;
    vm.infoPage = true;
    vm.lineGraph = {width: 500, height: 30, rSize: 12};
    vm.nextQuestion = nextQuestion;
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
      console.log(vm.currentAnswer);
      vm.currentQuestion.answers.push(vm.currentAnswer);
      vm.currentAnswer = {};
      console.log(vm.currentAnswer);
    }

    function createGame(){
      saveStep();
      ceGamesQuizzes.saveAndGetId(vm.quiz).$promise.then(function(res){
        $state.go('gameDisplayQuiz',{id: res.id});
      });
    }

    function goTo(id){
      var qNb = vm.currentQuestion.number || 0;
      // Check first page informations
      if(qNb == 0){
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
      }
      // Show step
      if(!isNaN(id)){
        vm.infoPage = false;
        var previousType = vm.currentQuestion.type;
        vm.currentQuestion = vm.quiz.questions[id-1];
        if(typeof vm.currentQuestion === "undefined"){
          vm.currentQuestion = {number: id, type: previousType, answers: []};
          vm.questionsInfos.splice(id,0,id);
        }
      }
    }

    function nextQuestion(){
      var qNb = vm.currentQuestion.number || 0;
      goTo(++qNb);
    }

    function resetAnswer(){
      vm.currentQuestion.answers = [];
    }

    function saveStep(){
      // Get current question number
      var qNb = vm.currentQuestion.number || 0;
      // Do not save if information screen
      if(!qNb){
        return;
      }
      // Save current question if new or edit previous
      if(qNb > vm.quiz.questions.length){
        vm.quiz.questions.push(vm.currentQuestion);
      } else {
        vm.quiz.questions[qNb-1] = vm.currentQuestion;
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
