(function(){
  'use strict';
  angular
    .module('app')
    .controller('GameDisplayQuizCtrl', GameDisplayQuizCtrl);

  GameDisplayQuizCtrl.$inject = ['quizPre'];
  function GameDisplayQuizCtrl(quizPre){
    var vm = this;

    vm.currentQuestion = quizPre.questions[0];
    vm.getProgress = getProgress;
    vm.isMultiAnswer = isMultiAnswer;
    vm.nextQuestion = nextQuestion;
    vm.quiz = quizPre;
    vm.validateAnswer = validateAnswer;
    vm.endOfQuiz = false;
    vm.score = 0;

    var qNb = 0;

    function getProgress(){
      return qNb/vm.quiz.questions.length;
    }

    function isMultiAnswer(){
      var answers = vm.currentQuestion.answers,
        count = 0;

      for(var i =0; i<answers.length; i++){
        if(answers[i].correct){
          if(count == 1) return true;
          count++;
        }
      }
      return false;
    }

    function getCurrentAnswer(){
      var answers = vm.currentQuestion.answers;
      for(var i =0; i<answers.length; i++){
        if(answers[i].correct){
          return answers[i].text;
        }
      }
    }

    function nextQuestion(){
      qNb++;
      if(qNb < vm.quiz.questions.length){
        console.log('test1');
        vm.currentQuestion = vm.quiz.questions[qNb];
      } else {
        if(vm.score < 0) vm.score = 0;
        vm.endOfQuiz = true;
      }
    }

    function validateAnswer(isMulti){
      if(isMulti){

      } else {
        if(vm.currentQuestion.answer !== getCurrentAnswer()){
          vm.score -= 3;
          return console.log(false);
        }
      }
      vm.score += 5;
      nextQuestion();
    }
  }
})();
