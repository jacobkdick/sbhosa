/*global angular*/
/*jslint node:true*/
'use strict';

angular
.module('hosaApp')
.controller('homeCtrl', ['$scope', 'Auth', '$state', function ($scope, Auth, $state) {
  $scope.user = Auth.$getAuth();
}]);
