/*global angular, firebase*/
/*jslint node:true*/
'use strict';

angular
.module('hosaApp')
.controller('homeCtrl', ['$firebaseArray', '$scope', '$state', 'Auth', 'NAV_LINKS',
function ($firebaseArray, $scope, $state, Auth, NAV_LINKS) {
  $scope.siteNavLinks = NAV_LINKS.internal;
  
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
  
  var importantDatesRef = firebase.database().ref('home/importantDates');
  $scope.importantDates = $firebaseArray(importantDatesRef);
}]);
