describe('Controller: RecipeDisplayCtrl', function () {

  // load the controller's module
  beforeEach(module('app.recipe.display'));

  /** Global variables **/
  var controller,
      $q,
      scope,
      mockBackend,
      mockRecipeComments,
      mockModalGallery,
      stateParams = {id: "12345"},
      recipe = getRecipe();

  /** Mocks services **/
  mockModalGallery = { openGallery: sinon.spy()};
  mockRecipeComments = {
    save: function(id,comment){return {$promise: $q.when(getReturnedComment())};}
  };

  /** Spies **/
  var spyAddComment = sinon.spy(mockRecipeComments,"save");

  /** Initialization **/
  beforeEach(inject(function ($controller, $rootScope, _$q_, $timeout, $httpBackend) {
    $q = _$q_;
    mockBackend = $httpBackend;
    scope = $rootScope.$new();

    // Create controller
    controller = $controller('RecipeDisplayCtrl', {
      $stateParams: stateParams,
      $timeout: $timeout,
      recipePre: recipe,
      ceRecipesComments: mockRecipeComments,
      ceModalGallery: mockModalGallery
    });
  }));

  /** Navigation **/
  describe('Steps navigation', function(){
    it('start by info page', function(){
      expect(controller.showInfoPage).to.equal(true);
      /* jshint expr:true */
      expect(controller.showStep).to.not.exist;
      /* jshint expr:true */
      expect(controller.stepsFinished).to.not.exist;
      expect(controller.currentStep).to.deep.equal({});
    });

    it('using next step from info', function(){
      controller.nextStep();
      expect(controller.showInfoPage).to.equal(false);
      expect(controller.showStep).to.equal(true);
      expect(controller.stepsFinished).to.equal(false);
      expect(controller.currentStep).to.equal(controller.recipe.steps[0]);
    });

    it('using go to step', function(){
      controller.goTo(2);
      expect(controller.currentStep).to.equal(controller.recipe.steps[1]);
    });

    it('using go to end', function(){
      controller.goTo('E');
      expect(controller.showInfoPage).to.equal(false);
      expect(controller.showStep).to.equal(false);
      expect(controller.stepsFinished).to.equal(true);
      expect(controller.currentStep).to.deep.equal({number: 'E'});
    });

    it('using previous step', function(){
      controller.goTo(2);
      controller.previousStep();
      expect(controller.showInfoPage).to.equal(false);
      expect(controller.showStep).to.equal(true);
      expect(controller.stepsFinished).to.equal(false);
      expect(controller.currentStep).to.equal(controller.recipe.steps[0]);
    });

    it('go to information page', function(){
      controller.nextStep();
      controller.previousStep();
      expect(controller.showInfoPage).to.equal(true);
      expect(controller.showStep).to.equal(false);
      expect(controller.stepsFinished).to.equal(false);
      expect(controller.currentStep).to.deep.equal({});
    });
  });

  /** Marking recipe **/
  describe('Marking recipe', function(){
    // Temporary increase
    it('should increase the temporary mark but not the mark', function () {
      // Increase temporary mark to 4
      controller.markEvent.mouseEnter(true,3);
      expect(controller.tempMark).to.equal(4);
      expect(controller.mark).to.equal(0);
    });
    // Temporary decrease
    it('should decrease the temporary mark but not the mark', function () {
      controller.markEvent.mouseEnter(true,3);
      controller.markEvent.mouseEnter(false,0);
      expect(controller.tempMark).to.equal(1);
      expect(controller.mark).to.equal(0);
    });
    // Reset mark on mouse leave
    it('should reset the temporary mark to current mark on leave', function () {
      controller.markEvent.mouseEnter(true,3);
      controller.markEvent.mouseEnter(false,0);
      controller.markEvent.mouseLeave();
      expect(controller.tempMark).to.equal(0);
      expect(controller.mark).to.equal(0);
    });
    // Save the mark
    it('should save the current mark', function () {
      controller.markEvent.mouseEnter(true,3);
      controller.markEvent.mouseUp();
      expect(controller.mark).to.equal(4);
    });
    // Decrease temporary mark
    it('should decrease the temporary mark but not the mark', function () {
      controller.markEvent.mouseEnter(true,3);
      controller.markEvent.mouseUp();
      controller.markEvent.mouseEnter(false,0);
      expect(controller.tempMark).to.equal(1);
      expect(controller.mark).to.equal(4);
    });
    // Should reset at previous mark
    it('should reset the temporary mark to current mark on leave', function () {
      controller.markEvent.mouseEnter(true,3);
      controller.markEvent.mouseUp();
      controller.markEvent.mouseEnter(false,0);
      controller.markEvent.mouseLeave();
      expect(controller.tempMark).to.equal(4);
      expect(controller.mark).to.equal(4);
    });
  });

  /** Add comments **/
  describe('Add comment', function(){
    it('should no create comment without text', function () {
      controller.addComment();
      /* jshint expr:true */
      spyAddComment.should.have.not.been.called;
      /* jshint expr:true */
      expect(controller.errors.addComment).to.exist;
    });

    it('should no create comment with text too short', function () {
      controller.currentComment = 'test';
      controller.addComment();
      /* jshint expr:true */
      spyAddComment.should.have.not.been.called;
      /* jshint expr:true */
      expect(controller.errors.addComment).to.exist;
    });

    it('should create comment without mark', function () {
      var res = {message: 'This is a text with at least 10 charaters'};
      controller.currentComment = res.message;
      controller.addComment();
      spyAddComment.should.have.been.calledWith({recipeId: stateParams.id},res);
      scope.$apply();
      expect(controller.recipe.comments[0]).to.deep.equal(getReturnedComment());
    });

    it('should create comment with mark', function () {
      var res = {message: 'This is a text with at least 10 charaters', mark: 4};
      controller.currentComment = res.message;
      controller.mark = res.mark;
      controller.addComment();
      spyAddComment.should.have.been.calledWith({recipeId: stateParams.id},res);
      scope.$apply();
      expect(controller.recipe.comments[0]).to.deep.equal(getReturnedComment());
    });
  });

  describe('Modal window image call', function(){
    it('should call the right image to be display', function () {
      controller.openGallery(0);
      mockModalGallery.openGallery.should.have.been.calledWith(0,controller.recipe.pictures);
      controller.openGallery(2);
      mockModalGallery.openGallery.should.have.been.calledWith(2,controller.recipe.pictures);
    });
  });

  describe('Like recipe',function(){
    it('should send like',function(){
      mockBackend
          .expectPUT('https://mysterious-eyrie-9135.herokuapp.com/recipes/' + controller.recipe._id + '/like',{})
          .respond({});
      controller.like();
      mockBackend.flush();
      expect(controller.liked).to.equal(true);
    });
  });

  /**
   * Mocking data
   */

  function getRecipe(){
    return {
        "_id": "12345",
        "name": "Chicken tomato",
        "course": 1,
        "createdOn": 1432307009187,
        "nbPerson": 2,
        "time": 1432307009187,
        "difficulty": 2,
        "author": "GeorgePompidou",
        "picture": "http://res.cloudinary.com/hqk7wz0oa/image/upload/v1432653456/cwnlqcwoha8jdzv2bfwk.jpg",
        "utensils": [],
        "comments": [
        {
          "date": 1432741022616,
          "message": "This is awesome",
          "author": "trtr",
          "mark": 3
        },
        {
          "date": 1432802668649,
          "message": "This was an awesome recipe I look forward to make it again.\nAll my children really liked it !",
          "author": "John"
        },
        {
          "date": 1432891326468,
          "author": "plop",
          "message": "abcdefghijklmnop"
        }
      ],
          "steps": [
        {
          "picture": "http://res.cloudinary.com/hqk7wz0oa/image/upload/v1432653408/hackklsbfxaoks9jhveu.jpg",
          "action": "Cut the carrot",
          "number": 1
        },
        {
          "picture": "http://res.cloudinary.com/hqk7wz0oa/image/upload/v1432653438/itia83uxfq19xhqvjktx.jpg",
          "action": "Cut the onions",
          "number": 2
        },
        {
          "picture": "http://res.cloudinary.com/hqk7wz0oa/image/upload/v1432653456/cwnlqcwoha8jdzv2bfwk.jpg",
          "action": "Steam the chicken",
          "number": 3
        }
      ],
          "ingredients": [
        {
          "unit": "kg",
          "qte": 1,
          "name": "Carott"
        },
        {
          "unit": "kg",
          "qte": 2,
          "name": "Onions"
        }
      ],
          "pictures": [
        {
          "thumbUrl": "http://res.cloudinary.com/hqk7wz0oa/image/upload/v1432653408/hackklsbfxaoks9jhveu.jpg",
          "url": " http://res.cloudinary.com/hqk7wz0oa/image/upload/v1432653408/hackklsbfxaoks9jhveu.jpg"
        },
        {
          "thumbUrl": "http://res.cloudinary.com/hqk7wz0oa/image/upload/v1432653438/itia83uxfq19xhqvjktx.jpg",
          "url": "http://res.cloudinary.com/hqk7wz0oa/image/upload/v1432653438/itia83uxfq19xhqvjktx.jpg"
        },
        {
          "thumbUrl": "http://res.cloudinary.com/hqk7wz0oa/image/upload/v1432653408/hackklsbfxaoks9jhveu.jpg",
          "url": "http://res.cloudinary.com/hqk7wz0oa/image/upload/v1432653408/hackklsbfxaoks9jhveu.jpg"
        },
        {
          "thumbUrl": "http://res.cloudinary.com/hqk7wz0oa/image/upload/v1432653456/cwnlqcwoha8jdzv2bfwk.jpg",
          "url": "http://res.cloudinary.com/hqk7wz0oa/image/upload/v1432653456/cwnlqcwoha8jdzv2bfwk.jpg"
        }
      ]
    };
  }

  function getReturnedComment(){
    return{
      _id: "55b3673fd23d7503008e4183",
      author: {
        _id: "55786079fcea910300386672",
        username: "Yummy"
      },
      createdOn: 1437814745694,
      message: "This is my comment",
      updateOn: 1437814745694
    };
  }
});
