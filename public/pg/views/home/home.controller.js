/*global angular, firebase*/
/*jslint node:true*/
'use strict';

angular
.module('hosaApp')
.controller('homeCtrl', ['$firebaseArray', '$scope', '$state', 'Auth', 'moment', 'NAV_LINKS',
function ($firebaseArray, $scope, $state, Auth, moment, NAV_LINKS) {
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
  
  // Get importantDates from Firebase, sort by startDate
  var importantDatesRef = firebase.database().ref('home/importantDates');
  var importantDatesQuery = importantDatesRef.orderByChild('startDate');
  $scope.importantDates = $firebaseArray(importantDatesQuery);
  
  // Get schoolFiles from Firebase, sort by filename
  var schoolFilesRef = firebase.database().ref('/home/schoolFiles');
  var schoolFilesQuery = schoolFilesRef.orderByChild('filename');
  $scope.schoolFiles = $firebaseArray(schoolFilesQuery);
}]);
