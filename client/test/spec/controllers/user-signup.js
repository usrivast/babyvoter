'use strict';

describe('Controller: UserSignupCtrl', function () {

  // load the controller's module
  beforeEach(module('clientApp'));

  var UserSignupCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    UserSignupCtrl = $controller('UserSignupCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(UserSignupCtrl.awesomeThings.length).toBe(3);
  });
});
