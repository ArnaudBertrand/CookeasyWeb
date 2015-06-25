'use strict';

describe('Controller: RecipeCreateCtrl', function () {

  // load the controller's module
  beforeEach(module('app'));

  var RecipeCreateCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    RecipeCreateCtrl = $controller('RecipeCreateCtrl', {
      $scope: scope
    });
  }));
});
