'use strict';

/**
 * @ngdoc overview
 * @name clientApp
 * @description
 * # clientApp
 *
 * Main module of the application.
 */
angular
  .module('clientApp', [
    'ngRoute',
    'ngStorage',
    'restangular',
    'ui.bootstrap',
    'http-auth-interceptor',
    'ngSanitize',
    'ui.select2',
    'ngAnimate',
    'rzModule',
    'ngTagsInput'
  ])

  .config(['$routeProvider', 'RestangularProvider', '$httpProvider',
    function ($routeProvider, RestangularProvider, $httpProvider) {

      RestangularProvider.setBaseUrl('http://localhost:3000/api/');

      $routeProvider
        .when('/', {
          templateUrl: 'views/main.html',
          controller: 'MainCtrl',
        })
        .when('/about', {
          templateUrl: 'views/about.html',
          controller: 'AboutCtrl',
        })
        .when('/contact', {
          templateUrl: 'views/contact.html',
          controller: 'ContactCtrl',
        })
        .when('/votes', {
          templateUrl: 'views/votes.html',
          controller: 'VotesCtrl',
        })
        .when('/create/vote', {
          templateUrl: 'views/vote-add.html',
          controller: 'VoteAddCtrl'
        })
        .when('/vote/:id', {
          templateUrl: 'views/vote-view.html',
          controller: 'VoteViewCtrl',
        })
        .when('/vote/:id/delete', {
          templateUrl: 'views/vote-delete.html',
          controller: 'VoteDeleteCtrl',
        })
        .when('/vote/:id/edit', {
          templateUrl: 'views/vote-edit.html',
          controller: 'VoteEditCtrl',
        })
        .when('/home', {
          templateUrl: 'views/home.html',
          controller: 'HomeCtrl',
        })
        .when('/signin', {
          templateUrl: 'views/signin.html',
          controller: 'HomeCtrl',
        })
        .when('/signup', {
          templateUrl: 'views/signup.html',
          controller: 'HomeCtrl',
        })
        .when('/me', {
          templateUrl: 'views/me.html',
          controller: 'HomeCtrl',
        })
        .when('/users', {
          templateUrl: 'views/users.html',
          controller: 'UsersCtrl',
        })
        .when('/user/:id', {
          templateUrl: 'views/user-view.html',
          controller: 'UserViewCtrl',
        })
        .when('/create/user', {
          templateUrl: 'views/user-signup.html',
          controller: 'UserSignupCtrl',
        })
        .otherwise({
          redirectTo: '/'
        });

      $httpProvider.interceptors.push(['$q', '$location', '$localStorage', function ($q, $location, $localStorage) {
        return {
          'request': function (config) {
            config.headers = config.headers || {};
            config.headers['Content-Type'] = "application/json";
            if ($localStorage.token) {
              config.headers.Authorization = 'Bearer ' + $localStorage.token;
              config.headers.token = $localStorage.token;
            }
            return config;
          },
          // 'responseError': function (response) {
          //   if (response.status === 401 || response.status === 403) {
          //     $location.path('/signin');
          //   }
          //   return $q.reject(response);
          // }
        };
      }]);
    }])
  //TODO remove this if not being used
  .config(function ($httpProvider) {
    $httpProvider.defaults.headers.common = {};
    $httpProvider.defaults.headers.post = {};
    $httpProvider.defaults.headers.put = {};
    $httpProvider.defaults.headers.patch = {};
  })
  .controller('NavCtrl', ['$rootScope', '$scope', '$location', '$localStorage', 'Main', 'authService',
    function ($rootScope, $scope, $location, $localStorage, Main, authService) {
      var viewLocation = {};
      $scope.isActive = function () {
        return viewLocation === $location.path();
      };


      $scope.signin = function () {
        var formData = {
          email: $scope.email,
          password: $scope.password
        }

        Main.signin(formData, function (res) {
          if (res.type == false) {
            alert(res.data)
          } else {
            $localStorage.token = res.data.token;
            authService.loginConfirmed();
            window.location.reload();
            // window.location = "/";
          }
        }, function () {
          $rootScope.error = 'Failed to signin';
        })
      };

      $scope.signup = function () {
        var formData = {
          email: $scope.email,
          password: $scope.password
        }

        Main.save(formData, function (res) {
          if (res.type == false) {
            alert(res.data)
          } else {
            $localStorage.token = res.data.token;
            window.location = "/"
          }
        }, function () {
          $rootScope.error = 'Failed to signup';
        })
      };

      $scope.me = function () {
        Main.me(function (res) {
          $scope.myDetails = res;
        }, function () {
          $rootScope.error = 'Failed to fetch details';
        })
      };

      $scope.isAuthenticated = Main.isAuthenticated();

      $scope.logout = function () {
        Main.logout(function () {
          window.location = "/"
        }, function () {
          alert("Failed to logout!");
        });
        authService.loginCancelled();
      };
      $scope.token = $localStorage.token;

    }])
  .directive('authDemoApplication', function () {
    return {
      restrict: 'C',
      link: function (scope, elem, attrs) {
        //once Angular is started, remove class:
        elem.removeClass('waiting-for-angular');

        var login = elem.find('#login-holder');
        var main = elem.find('#content');

        login.hide();

        scope.$on('event:auth-loginRequired', function () {
          login.slideDown('slow', function () {
            main.hide();
          });
        });
        scope.$on('event:auth-loginConfirmed', function () {
          // main.show();
          login.slideUp('slow', function() {
            main.show();
          });
        });
      }
    }
  });

