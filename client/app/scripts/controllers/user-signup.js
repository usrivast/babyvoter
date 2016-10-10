'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:UserSignupCtrl
 * @description
 * # UserSignupCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('UserSignupCtrl', function ($rootScope, $scope, $location, Main) {
    $scope.user = {};
    $scope.saveUser = function() {
      $scope.user.displayName = $scope.user.firstName + ' '+$scope.user.lastName;
      Main.save($scope.user, function() {
        // Main.signin($scope.user);
          $rootScope.success = 'Failed to fetch details';

      },
        function() {
          $rootScope.error = 'Failed to fetch details';
        })
        // UserFactory.post($scope.user).then(function() {
        //   $location.path('/user');
        // });
    };
  });
