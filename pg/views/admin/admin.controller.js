/*global angular, firebase*/
/*jslint node:true*/
'use strict';

angular
.module('hosaApp')
.controller('adminCtrl', ['$firebaseArray', '$scope', '$state', 'Auth', 'NAV_LINKS',
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
  $scope.noticeSuccess = null;
  
  var importantDatesRef = firebase.database().ref('home/importantDates');
  var importantDatesQuery = importantDatesRef.orderByChild('startDate');
  $scope.importantDates = $firebaseArray(importantDatesQuery);
  
  $scope.newImportantDate = {
    name: '',
    location: '',
    startDate: '',
    endDate: '',
    description: '',
  };
  
  $scope.addDate = function () {    
    var newDate = $scope.newImportantDate;
    
    $scope.importantDates.$add(newDate)
    .then(function (ref) {
      var data = ref;
      console.log('Added new record with id ' + ref.key);
      
      $scope.newImportantDate.name = '';
      $scope.newImportantDate.location = '';
      $scope.newImportantDate.startDate = '';
      $scope.newImportantDate.endDate = '';
      $scope.newImportantDate.description = '';
    });
  };
  
  $scope.refreshBindings = function () {
    var importantDatesRef = firebase.database().ref('home/importantDates');
  var importantDatesQuery = importantDatesRef.orderByChild('startDate');
  $scope.importantDates = $firebaseArray(importantDatesQuery);
  };
}]);
