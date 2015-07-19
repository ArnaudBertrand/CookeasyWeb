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
    vm.onClickAnswer = onClickAnswer;
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
        if(answers[i].correct) return answers[i].text;
      }
    }

    function nextQuestion(){
      qNb++;
      if(qNb < vm.quiz.questions.length){
        vm.currentQuestion = vm.quiz.questions[qNb];
      } else {
        if(vm.score < 0) vm.score = 0;
        vm.endOfQuiz = true;
      }
    }

    function onClickAnswer(answer){
      if(isMultiAnswer()){
        answer.checked = !answer.checked;
      } else {
        validateAnswer(answer);
      }
    }

    function validateAnswer(answer){
      if(isMultiAnswer()){
        var answers = vm.currentQuestion.answers;
        for(var i =0; i<answers.length; i++){
          var answer = answers[i];
          if(answer.correct && !answer.checked || !answer.correct && answer.checked) return vm.score -= 3;
        }
      } else {
        if(answer){
          if(!answer.correct) return vm.score -= 3;
        } else if(vm.currentQuestion.answer !== getCurrentAnswer()){
          return vm.score -= 3;
        }
      }
      vm.score += 5;
      nextQuestion();
    }
  }
})();
