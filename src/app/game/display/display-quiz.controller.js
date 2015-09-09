(function(){
  'use strict';

  angular
      .module( 'app.game.quiz.display', [])
      .controller('GameDisplayQuizCtrl', GameDisplayQuizCtrl);

  GameDisplayQuizCtrl.$inject = ['$http','$state','quizPre'];
  function GameDisplayQuizCtrl($http,$state,quizPre){
    var vm = this;

    vm.currentQuestion = quizPre.questions[0];
    vm.endOfQuiz = false;
    vm.getProgress = getProgress;
    vm.goToSearch = goToSearch;
    vm.isMultiAnswer = isMultiAnswer;
    vm.like = like;
    vm.nextQuestion = nextQuestion;
    vm.nbMistake = 0;
    vm.onClickAnswer = onClickAnswer;
    vm.quiz = quizPre;
    vm.score = 0;
    vm.retry = retry;
    vm.validateAnswer = validateAnswer;
    var qNb = 0;

    function getProgress(){
      return qNb/vm.quiz.questions.length;
    }

    function isMultiAnswer(){
      var answers = vm.currentQuestion.answers,
        count = 0;

      for(var i =0; i<answers.length; i++){
        if(answers[i].correct){
          if(count == 1) {return true;}
          count++;
        }
      }
      return false;
    }

    function getCurrentAnswer(){
      var answers = vm.currentQuestion.answers;
      for(var i =0; i<answers.length; i++){
        if(answers[i].correct) {return answers[i].text;}
      }
    }

    function goToSearch(){
      $state.go('gameSearch');
    }

    function like(){
      if(!vm.liked){
        $http.put('https://mysterious-eyrie-9135.herokuapp.com/games/' + vm.quiz._id + '/like',{}).success(function(){
          vm.liked = true;
        }).error(function(err){
          console.log(err);
        });
      }
    }

    function nextQuestion(){
      qNb++;
      if(qNb < vm.quiz.questions.length){
        vm.currentQuestion = vm.quiz.questions[qNb];
      } else {
        if(vm.score < 0) {vm.score = 0;}
        vm.endOfQuiz = true;
        sendScore();
      }
    }

    function onClickAnswer(answer){
      if(isMultiAnswer()){
        answer.checked = !answer.checked;
      } else {
        validateAnswer(answer);
      }
    }

    function retry(){
      $state.reload();
    }

    function sendScore(){
      var data = {game: vm.quiz._id, score: vm.score},
        url = 'https://mysterious-eyrie-9135.herokuapp.com/users/' + vm.quiz._id + '/scores';

      console.log('test');
      $http({method: 'POST', url: url, data: data})
        .success(function(res){
          vm.totalScore = res.total;
        }).error(function(err){
          console.log(err);
        });
    }

    function validateAnswer(answer){
      if(isMultiAnswer()){
        var answers = vm.currentQuestion.answers;
        for(var i =0; i<answers.length; i++){
          var curAnswer = answers[i];
          if(curAnswer.correct && !curAnswer.checked || !curAnswer.correct && curAnswer.checked) {return fail();}
        }
      } else {
        if(answer){
          answer.clicked = true;
          if(!answer.correct) {return fail();}
        } else if(vm.currentQuestion.answer !== getCurrentAnswer()) {return fail();}
      }

      vm.score += 5;
      nextQuestion();

      function fail(){
        vm.nbMistake++;
        return vm.score -= 3;
      }
    }
  }
})();
