/*global angular*/
/*jslint node:true*/
'use strict';

angular
.module('hosaApp')
.controller('loginCtrl', ['$scope', '$state', 'Auth', 'NAV_LINKS', function ($scope, $state, Auth, NAV_LINKS) {
  $scope.siteNavLinks = NAV_LINKS.internal;
  
  $scope.user = Auth.$getAuth();
  $scope.loginUser = {
    email: null,
    password: null,
  };
  
  $scope.signIn = function () {
    $scope.error = null;
    
    Auth.$signInWithEmailAndPassword($scope.loginUser.email, $scope.loginUser.password)
    .then(function (firebaseUser) {
      $state.go('admin');
    }).catch(function (err) {
      $scope.error = 'Error signing in.';
      console.error('Auth failed: ', err);
    });
  };
}]);
