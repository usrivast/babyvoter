'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:UsersCtrl
 * @description
 * # UsersCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('UsersCtrl', ['$scope', 'UserFactory', 'Main', function ($scope, UserFactory, Main) {
    $scope.isAuthenticated = Main.isAuthenticated();

    var users = UserFactory.getList().$object;
    $scope.users = users;
  }]);
