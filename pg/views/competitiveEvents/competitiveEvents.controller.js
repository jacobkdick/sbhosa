/*global angular, firebase*/
/*jslint node:true*/
'use strict';

angular
.module('hosaApp')
.controller('competitiveEventsCtrl', ['$firebaseArray', '$scope', '$state', 'Auth', 'NAV_LINKS',
function ($firebaseArray, $scope, $state, Auth, NAV_LINKS) {
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
  
  // Get compEventsLinks from Firebase
  var compEventsLinksRef = firebase.database().ref('competitiveEvents/links');
  var compEventsLinksQuery = compEventsLinksRef.orderByChild('name');
  $scope.compEventsLinks = $firebaseArray(compEventsLinksQuery);
  
  // Set newCompEventLink to bind to $scope
  $scope.newCompEventLink = {
    name: '',
    url: '',
    tag: '',
  };
  
  /*
   * addLink()
   * 
   * Adds an item to compEventsLinks Firebase array.
   */
  $scope.addLink = function () {
    var newLink = $scope.newCompEventLink;
    
    $scope.compEventsLinks.$add(newLink)
    .then(function (ref) {
      var data = ref;
      console.log('Added new record with id ' + ref.key);
      
      $scope.newCompEventLink.name = '';
    });
  };
  
  /*
   * refreshBindings()
   * 
   * Reloads database connection to update and sort table.
   */
  $scope.refreshBindings = function () {
    var compEventsLinksRef = firebase.database().ref('competitiveEvents/home');
    var compEventsLinksQuery = compEventsLinksRef.orderByChild('name');
    $scope.compEventsLinks = $firebaseArray(compEventsLinksQuery);
  };
}]);
