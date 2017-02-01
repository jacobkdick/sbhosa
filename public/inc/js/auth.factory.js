/*global angular*/
/*jslint node:true*/
'use strict';

angular
.module('hosaApp')
.factory('Auth', ['$firebaseAuth', function ($firebaseAuth) {
  var auth = $firebaseAuth();
  
  return auth;
}]);
