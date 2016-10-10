'use strict';

describe('Controller: UserViewCtrl', function () {

  // load the controller's module
  beforeEach(module('clientApp'));

  var UserViewCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    UserViewCtrl = $controller('UserViewCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(UserViewCtrl.awesomeThings.length).toBe(3);
  });
});
