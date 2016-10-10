'use strict';

/* Controllers */

angular.module('clientApp')
  .controller('HomeCtrl', ['$rootScope', '$scope', '$location', '$localStorage', 'Main', 'authService',
    function($rootScope, $scope, $location, $localStorage, Main, authService) {

  }])
  .controller('MeCtrl', ['$rootScope', '$scope', '$location', 'Main', function($rootScope, $scope, $location, Main) {

    Main.me(function(res) {
      $scope.myDetails = res;
    }, function() {
      $rootScope.error = 'Failed to fetch details';
    })
  }]);
