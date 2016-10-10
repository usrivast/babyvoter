'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:UserViewCtrl
 * @description
 * # UserViewCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('UserViewCtrl', function (
    $scope,
    $routeParams,
    UserFactory
  ) {
    $scope.viewUser = true;
    $scope.user = UserFactory.one($routeParams.id).get().$object;
  });
