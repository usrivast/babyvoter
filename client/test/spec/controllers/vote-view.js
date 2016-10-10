'use strict';

describe('Controller: VoteViewCtrl', function () {

  // load the controller's module
  beforeEach(module('clientApp'));

  var VoteViewCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    VoteViewCtrl = $controller('VoteViewCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(VoteViewCtrl.awesomeThings.length).toBe(3);
  });
});
