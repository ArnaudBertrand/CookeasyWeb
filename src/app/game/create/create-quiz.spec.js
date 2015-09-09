describe( 'GameCreateQuizCtrl', function() {
  beforeEach(module('app.game.quiz.create'));

  var controller,
      $q,
      scope,
      state,
      mockCeGamesQuizzes;

  // Mock data
  var mockData = {
    getMissingCorrectTextQuestion: getMissingCorrectTextQuestion,
    getValidTextQuestion: getValidTextQuestion,
    getValidQuiz: getValidQuiz
  };

  // Mock services
  mockCeGamesQuizzes = {saveAndGetId: function(quiz){ return {$promise: $q.when({id: '123456'})};}};
  state = {go: sinon.spy()};

  var spySaveGame = sinon.spy(mockCeGamesQuizzes, "saveAndGetId");

  beforeEach( inject( function( $controller, $rootScope, _$q_ ) {
    $q = _$q_;
    scope = $rootScope.$new();
    controller = $controller( 'GameCreateQuizCtrl', {
        $state: state,
        ceGamesQuizzes: mockCeGamesQuizzes
      });
  }));

  /** First page **/
  describe('First page', function(){
    it('should start by info page', function(){
      expect(controller.infoPage).to.equal(true);
    });

    describe('when clicking on next',function(){
      beforeEach(function(){ controller.nextQuestion(); });

      it('should not have errors', function(){
        expect(Object.keys(controller.errors)).to.have.length(0);
      });
      it('should have 1 more question in the questions infos', function(){
        expect(controller.questionsInfos).to.have.length(2);
      });
      it('should not have 1 more question in the questions', function(){
        expect(controller.quiz.questions).to.have.length(0);
      });
      it('should leave info page', function(){
        expect(controller.infoPage).to.equal(false);
      });
    });

    describe('when going back on',function() {
      beforeEach(function(){
        controller.nextQuestion();
        controller.currentQuestion = mockData.getValidTextQuestion();
        controller.goTo('I');
      });

      it('should return to info page', function(){
        expect(controller.infoPage).to.equal(true);
      });
      it('should have 1 more question in the questions', function(){
        expect(controller.quiz.questions).to.have.length(1);
      });
    });
  });

  /** Go to **/
  describe('Go to',function(){
    beforeEach(function(){
      // Create 5 questions
      for(var i = 0; i<5; i++){
        controller.nextQuestion();
        controller.currentQuestion = mockData.getValidTextQuestion();
      }
    });

    it('should navigate correctly',function(){
      controller.goTo(2);
      expect(controller.qNb).to.equal(2);
      expect(controller.currentQuestion).to.deep.equal(controller.quiz.questions[1]);
      controller.goTo(5);
      expect(controller.qNb).to.equal(5);
      expect(controller.currentQuestion).to.deep.equal(controller.quiz.questions[4]);
    });
  });

  /** Answers **/
  describe('Answers', function(){
    beforeEach(function(){ controller.nextQuestion(); });

    it('should add correct answer',function(){
      var expectedAnswer = {text: 'france', correct:true};
      controller.currentAnswer = {text: 'france'};
      controller.addAnswer(true);
      expect(controller.currentQuestion.answers).to.have.length(1);
      expect(controller.currentQuestion.answers[0]).to.deep.equal(expectedAnswer);
    });

    it('should add uncorrect answer',function(){
      var expectedAnswer = {text: 'france'};
      controller.currentAnswer = {text: 'france'};
      controller.addAnswer(false);
      expect(controller.currentQuestion.answers).to.have.length(1);
      expect(controller.currentQuestion.answers[0]).to.deep.equal(expectedAnswer);
    });

    it('should block over 4 answers',function(){
      for(var i = 0; i<10; i++){
        controller.currentAnswer = {text: 'france'};
        controller.addAnswer(false);
      }
      expect(controller.currentQuestion.answers).to.have.length(4);
    });

    describe('should delete', function(){
      beforeEach(function() {controller.currentQuestion = mockData.getValidTextQuestion();} );

      it('last answer',function() {
        var expectedAnswer = [];
        expectedAnswer.push(controller.currentQuestion.answers[0]);
        expectedAnswer.push(controller.currentQuestion.answers[1]);
        controller.deleteAnswer(2);
        expect(controller.currentQuestion.answers).to.deep.equal(expectedAnswer);
      });

      it('first answer',function(){
        var expectedAnswer = [];
        expectedAnswer.push(controller.currentQuestion.answers[1]);
        expectedAnswer.push(controller.currentQuestion.answers[2]);
        controller.deleteAnswer(0);
        expect(controller.currentQuestion.answers).to.deep.equal(expectedAnswer);
      });
    });

    it('should reset answer', function(){
      controller.currentQuestion = getValidTextQuestion();
      controller.resetAnswer();
      expect(controller.currentQuestion.answers).to.have.length(0);
    });
  });

  describe('Questions', function(){
    beforeEach(function(){ controller.nextQuestion(); });

    it('should not pass with title < 5 chars', function(){
      var question = mockData.getValidTextQuestion();
      question.title = '';
      controller.currentQuestion = question;
      controller.nextQuestion();
      expect(controller.qNb).to.equal(1);
      /* jshint expr:true */
      expect(controller.errors.title).to.exist;
    });

    it('should not pass with nb of answers < 2', function(){
      var question = mockData.getValidTextQuestion();
      question.answers = [];
      controller.currentQuestion = question;
      controller.nextQuestion();
      expect(controller.qNb).to.equal(1);
      /* jshint expr:true */
      expect(controller.errors.answers).to.exist;
    });

    it('should not pass with nb of answers > 4', function(){
      var question = mockData.getValidTextQuestion();
      question.answers.push({'text': 'usa'});
      question.answers.push({'text': 'thailand'});
      controller.currentQuestion = question;
      controller.nextQuestion();
      expect(controller.qNb).to.equal(1);
      /* jshint expr:true */
      expect(controller.errors.answers).to.exist;
    });

    it('should not pass without at least one correct answer', function(){
      var question = mockData.getMissingCorrectTextQuestion();
      controller.currentQuestion = question;
      controller.nextQuestion();
      expect(controller.qNb).to.equal(1);
      /* jshint expr:true */
      expect(controller.errors.answers).to.exist;
    });
  });

  describe('Delete question',function (){
    beforeEach(function(){ controller.nextQuestion(); });

    it('should delete the first question', function(){
      controller.deleteQuestion();
      expect(controller.qNb).to.equal(0);
      expect(controller.quiz.questions).to.have.length(0);
    });

    it('should delete the last question not saved', function(){
      for(var i = 0; i<5; i++){
        controller.nextQuestion();
        controller.currentQuestion = mockData.getValidTextQuestion();
      }
      controller.deleteQuestion();
      expect(controller.qNb).to.equal(4);
      expect(controller.quiz.questions).to.have.length(4);
      expect(controller.questionsInfos).to.have.length(5);
    });

    it('should delete any question', function(){
      for(var i = 0; i<5; i++){
        controller.nextQuestion();
        controller.currentQuestion = mockData.getValidTextQuestion();
      }
      controller.goTo(3);
      controller.deleteQuestion();
      expect(controller.qNb).to.equal(2);
      expect(controller.quiz.questions).to.have.length(4);
      expect(controller.questionsInfos).to.deep.equal(['I',1,2,3,4]);
    });
  });

  describe('Create the quiz', function(){
    it('should work',function(){
      controller.quiz = mockData.getValidQuiz();
      controller.currentQuestion = mockData.getValidTextQuestion();
      controller.createGame();
      scope.$apply();
      spySaveGame.should.have.been.calledWith(controller.quiz);
      state.go.should.have.been.calledWith("gameDisplayQuiz",{id: '123456'});
    });
  });

  /**
   * Mocking data
   */

  function getMissingCorrectTextQuestion(){
    var answers = [
      {text: 'france'},
      {text: 'norway'},
      {text: 'uk'}
    ];
    return {title: 'Which country is best at cooking?', type: 'text', answers: answers};
  }

  function getValidTextQuestion(){
    var answers = [
      {text: 'france', correct: true},
      {text: 'norway'},
      {text: 'uk'}
    ];
    return {title: 'Which country is best at cooking?', type: 'text', answers: answers};
  }

  function getValidQuiz(){
    return {
      "title": "le monde",
      "type": "quiz",
      "updatedOn": 1437232270716,
      "questions": [
        {
          "title": "capital",
          "type": "text",
          "answers": [
            {"text": "paris", "correct": true},
            {"text": "aaaaaaa", "correct": true}
          ]
        }
      ]
    };
  }
});
