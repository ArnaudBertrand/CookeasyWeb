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
    vm.currentQuestion = {answers: [], title: '', type: 'text'};
    vm.currentAnswer = {};
    vm.deleteAnswer = deleteAnswer;
    vm.errors = {};
    vm.pictureUrl = 'https://mysterious-eyrie-9135.herokuapp.com/pictures';
    vm.quiz = {questions: [], title: ''};
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

    function checkQuestion(){
      vm.errors = {};
      var q = vm.currentQuestion;
      if(q.title.length < 5) vm.errors.title = 'Title too short, 5 chars minimum';
      if(q.answers.length < 2) vm.errors.answers = 'Insert at least 2 answers';
    }

    function createGame(){
      // Check first page informations
      if(vm.qNb > 0) checkQuestion();

      // Stop if there are some errors
      if(Object.keys(vm.errors).length) return false;

      saveStep();
      ceGamesQuizzes.saveAndGetId(vm.quiz).$promise.then(function(res){
        $state.go('gameDisplayQuiz',{id: res.id});
      });
    }

    function deleteAnswer(index){
      vm.currentQuestion.answers.splice(index,1);
    }

    function deleteQuestion(){
      // Go to previous step
      goTo(vm.qNb-1,true);
      // Remove from array only if it is already in
      if (vm.qNb < vm.quiz.questions.length) vm.quiz.questions.splice(vm.qNb,1);

      // Remove from question info
      vm.questionsInfos.splice(vm.qNb+1,1);
      // Change step numbers
      vm.questionsInfos= vm.questionsInfos.map(function(q){
        return (!isNaN(q) && q > vm.qNb) ? --q: q;
      });
    }

    function goTo(id,skipSave){
      // Check first page informations
      if(vm.qNb > 0 && !skipSave) checkQuestion();

      // Stop if there are some errors
      if(Object.keys(vm.errors).length) return false;

      // Save step
      if(!skipSave) saveStep();

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
          vm.currentQuestion = {answers: [], title: '', type: previousType};
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
