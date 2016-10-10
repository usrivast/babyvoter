'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:VotesCtrl
 * @description
 * # VotesCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('VotesCtrl', function ($scope, VoteFactory, Main) {
    $scope.isAuthenticated = Main.isAuthenticated();
    if($scope.isAuthenticated){
      $scope.votes = VoteFactory.getList().$object;
    }

  });
