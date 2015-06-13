'use strict';

describe('Directive: Menu', function () {

  // load the directive's module
  beforeEach(module('applicationApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));
  /**
  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<-menu></-menu>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the Menu directive');
  }));
  **/
});
