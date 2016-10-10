'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:VoteViewCtrl
 * @description
 * # VoteViewCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('VoteViewCtrl', function (
    $scope,
    $routeParams,
    VoteFactory,
    Main
  ) {
      $scope.isAuthenticated = Main.isAuthenticated();
    if($scope.isAuthenticated) {
      $scope.viewVote = true;
      $scope.vote = VoteFactory.one($routeParams.id).get().$object;
    }
  });
