'use strict';

describe('Controller: CreateRecipeCtrl', function () {

  // load the controller's module
  beforeEach(module('app'));

  var CreateRecipeCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CreateRecipeCtrl = $controller('CreateRecipeCtrl', {
      $scope: scope
    });
  }));
});
