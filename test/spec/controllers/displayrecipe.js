'use strict';

describe('Controller: DisplayRecipeCtrl', function () {

  // load the controller's module
  beforeEach(module('app'));

  var DisplayRecipeCtrl,
    scope,
    mockRecipeService,
    mockModalWindow;

  var stateParams = {id: "12345"};

  var recipe = {
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


  // Initialize the controller and a mock scope
  beforeEach(function(){
    inject(function ($controller, $rootScope, $q, Upload) {

      scope = $rootScope.$new();
      // Mock Modal window
      mockModalWindow = { openGallery: jasmine.createSpy("openGallery")};

      // Mock Recipe services
      mockRecipeService = {
        addComment: jasmine.createSpy("addComment").and.callFake(function(id,comment){
          var deferred = $q.defer();
          deferred.resolve({});
          return deferred.promise;
        }),
        get: jasmine.createSpy("get").and.callFake(function(id){
          var deferred = $q.defer();
          deferred.resolve(recipe);
          return deferred.promise;
        })
      };

      // Create controller
      DisplayRecipeCtrl = $controller('DisplayRecipeCtrl', {
        $scope: scope,
        RecipeService: mockRecipeService,
        $stateParams: stateParams,
        ModalWindow: mockModalWindow,
        Upload: Upload
      });

      // Update recipe
      scope.$apply();
    });
  });

  // Test navigation inside recipe
  describe('Steps navigation', function(){
    // Begin with info page
    it('should start by info page', function(){
      expect(scope.showInfoPage).toBe(true);
      expect(scope.showStep).not.toBe(true);
      expect(scope.stepsFinished).not.toBe(true);
      expect(scope.currentStep).toEqual({});
    });
    // Show first step
    it('should show the first step', function(){
      scope.nextStep();
      expect(scope.showInfoPage).not.toBe(true);
      expect(scope.showStep).toBe(true);
      expect(scope.stepsFinished).not.toBe(true);
      expect(scope.currentStep).toEqual(scope.recipe.steps[0]);
    });
    // Show first step
    it('should show the second step', function(){
      scope.nextStep();
      scope.nextStep();
      expect(scope.currentStep).toEqual(scope.recipe.steps[1]);
    });
    // Show ending
    it('should show the ending page', function(){
      scope.nextStep();
      scope.nextStep();
      scope.nextStep();
      scope.nextStep();
      expect(scope.showInfoPage).not.toBe(true);
      expect(scope.showStep).not.toBe(true);
      expect(scope.stepsFinished).toBe(true);
      expect(scope.currentStep).toEqual({});
    });
    // Previous on 1st step
    it('should show the information page', function(){
      scope.nextStep();
      scope.previousStep();
      expect(scope.showInfoPage).toBe(true);
      expect(scope.showStep).not.toBe(true);
      expect(scope.stepsFinished).not.toBe(true);
      expect(scope.currentStep).toEqual({});
    });
    // Previous on 2nd step
    it('should show the first page', function(){
      scope.nextStep();
      scope.nextStep();
      scope.previousStep();
      expect(scope.showInfoPage).not.toBe(true);
      expect(scope.showStep).toBe(true);
      expect(scope.stepsFinished).not.toBe(true);
      expect(scope.currentStep).toEqual(scope.recipe.steps[0]);
    });
  });

  // Test marking recipe
  describe('Marking recipe', function(){
    // Temporary increase
    it('should increase the temporary mark but not the mark', function () {
      // Increase temporary mark to 4
      scope.markEvent.mouseEnter(true,3);
      expect(scope.tempMark).toBe(4);
      expect(scope.mark).toBe(0);
    });
    // Temporary decrease
    it('should decrease the temporary mark but not the mark', function () {
      scope.markEvent.mouseEnter(true,3);
      scope.markEvent.mouseEnter(false,0);
      expect(scope.tempMark).toBe(1);
      expect(scope.mark).toBe(0);
    });
    // Reset mark on mouse leave
    it('should reset the temporary mark to current mark on leave', function () {
      scope.markEvent.mouseEnter(true,3);
      scope.markEvent.mouseEnter(false,0);
      scope.markEvent.mouseLeave();
      expect(scope.tempMark).toBe(0);
      expect(scope.mark).toBe(0);
    });
    // Save the mark
    it('should save the current mark', function () {
      scope.markEvent.mouseEnter(true,3);
      scope.markEvent.mouseUp();
      expect(scope.mark).toBe(4);
    });
    // Decrease temporary mark
    it('should decrease the temporary mark but not the mark', function () {
      scope.markEvent.mouseEnter(true,3);
      scope.markEvent.mouseUp();
      scope.markEvent.mouseEnter(false,0);
      expect(scope.tempMark).toBe(1);
      expect(scope.mark).toBe(4);
    });
    // Should reset at previous mark
    it('should reset the temporary mark to current mark on leave', function () {
      scope.markEvent.mouseEnter(true,3);
      scope.markEvent.mouseUp();
      scope.markEvent.mouseEnter(false,0);
      scope.markEvent.mouseLeave();
      expect(scope.tempMark).toBe(4);
      expect(scope.mark).toBe(4);
    });
  });

  // Test Add comment
  describe('Add comment', function(){
    it('should no create comment with text too short or unexisting', function () {
      scope.addComment();
      expect(mockRecipeService.addComment).not.toHaveBeenCalled();
      scope.currentComment = 'test';
      scope.addComment();
      expect(mockRecipeService.addComment).not.toHaveBeenCalled();
      expect(scope.errors.addComment).toBeDefined();
    });
    it('should create comment without mark', function () {
      var res = {message: 'This is a text with at least 10 charaters'};
      scope.currentComment = res.message;
      scope.addComment();
      expect(mockRecipeService.addComment).toHaveBeenCalledWith(stateParams.id,res);
    });
    it('should create comment with mark', function () {
      var res = {message: 'This is a text with at least 10 charaters', mark: 4};
      scope.currentComment = res.message;
      scope.mark = res.mark;
      scope.addComment();
      expect(mockRecipeService.addComment).toHaveBeenCalledWith(stateParams.id,res);
    });
  });

  // Test image upload
  describe('Image upload', function(){
    var httpBackend, mockFile;
    console.log('https://mysterious-eyrie-9135.herokuapp.com/recipe/'+stateParams.id+'/pictures/upload');
    var expectedUrl = 'https://mysterious-eyrie-9135.herokuapp.com/recipe/'+stateParams.id+'/pictures/upload';
    beforeEach(inject(function($httpBackend){
      httpBackend = $httpBackend;
      mockFile = [{"name":"File 1", "body":"abcd121212"}];
    }));
    it('should call the upload method with good parameters', function () {
      var data = {success: true};
      httpBackend.expectPOST(expectedUrl).respond(200, data);
      scope.uploadFile(mockFile);
      httpBackend.flush();
      expect(scope.uploadedPicture).toBe(true);
    });
  });

  // Test modal window image call
  describe('Modal window image call', function(){
    it('should call the right image to be display', function () {
      scope.openGallery(0);
      expect(mockModalWindow.openGallery).toHaveBeenCalledWith(0,scope.recipe.pictures);
      scope.openGallery(2);
      expect(mockModalWindow.openGallery).toHaveBeenCalledWith(2,scope.recipe.pictures);
    });
  });
});
