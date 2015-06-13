'use strict';

/**
 * @ngdoc function
 * @name applicationApp.controller:ContactCtrl
 * @description
 * # ContactCtrl
 * Controller of the applicationApp
 */
angular.module('applicationApp')
  .controller('ContactCtrl',
    ['$scope', '$rootScope', '$location','$window', 'UserService','AuthenticationService',
    function ($scope, $rootScope, $location, $window, UserService, AuthenticationService) {
      // User
      $scope.userLogin = {id: '', password: ''};
      $scope.userSignup = {username: '', password: '', confirmPassword: '', email: ''};

      $scope.notConnected = !AuthenticationService.isLogged;
      $scope.login = function () {
        $scope.dataLoading = true;
        $scope.error = "";

        UserService.login($scope.userLogin).then(function (token) {
          AuthenticationService.isLogged = true;
          $scope.notConnected = false;
          $window.sessionStorage.token = token;
          $scope.dataLoading = false;
        }, function (error){
          $scope.error = error;
          $scope.dataLoading = false;
        });
      };

      $scope.register = function(){
        $scope.dataLoading = true;
        $scope.error = "";

        if($scope.userSignup.password !== $scope.userSignup.confirmPassword){
          $scope.dataLoading = false;
          return $scope.error = "Passwords do not match";
        }
        
        UserService.signUp($scope.userSignup).then(function(token) {
          AuthenticationService.isLogged = true;
          $scope.notConnected = false;
          $window.sessionStorage.token = token;
          $scope.dataLoading = false;
        },function(error){
          $scope.error = error;
          $scope.dataLoading = false;
        });
      }
    }]);
