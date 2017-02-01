/*global angular*/
/*jslint node:true*/
'use strict';

angular
.module('hosaApp')
.controller('loginCtrl', ['$scope', '$state', 'Auth', 'NAV_LINKS', function ($scope, $state, Auth, NAV_LINKS) {
  $scope.siteNavLinks = NAV_LINKS.internal;
  
  // Auth
  $scope.Auth = Auth;
  $scope.user = Auth.$getAuth();
  $scope.signOut = function () {
    Auth.$signOut();
    $scope.user = null;
    Auth.$onAuthStateChanged(function (firebaseUser) {
      if (firebaseUser) {
        $scope.user = firebaseUser;
        $scope.errorNotice = 'Unable to sign out.';
      } else {
        $state.go('home');
      }
    });
  };
  
  if ($scope.user) {
    $state.go('admin');
  }
  
  $scope.loginUser = {
    email: null,
    password: null,
  };
  
  $scope.signIn = function () {
    $scope.error = null;
    
    Auth.$signInWithEmailAndPassword($scope.loginUser.email, $scope.loginUser.password)
    .then(function (firebaseUser) {
      console.log('Login success.');
      $state.go('admin');
    }).catch(function (err) {
      $scope.error = 'Error signing in.';
      console.error('Auth failed: ', err);
      $scope.loginUser.password = null;
    });
  };
}]);
