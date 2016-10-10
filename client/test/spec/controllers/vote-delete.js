'use strict';

describe('Controller: VoteDeleteCtrl', function () {

  // load the controller's module
  beforeEach(module('clientApp'));

  var VoteDeleteCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    VoteDeleteCtrl = $controller('VoteDeleteCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(VoteDeleteCtrl.awesomeThings.length).toBe(3);
  });
});
