'use strict';

describe('Controller: VoteEditCtrl', function () {

  // load the controller's module
  beforeEach(module('clientApp'));

  var VoteEditCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    VoteEditCtrl = $controller('VoteEditCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(VoteEditCtrl.awesomeThings.length).toBe(3);
  });
});
