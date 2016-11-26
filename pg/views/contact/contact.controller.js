/*global angular*/
/*jslint node:true*/
'use strict';

angular
.module('hosaApp')
.controller('contactCtrl', ['$scope', '$state', 'Auth', 'NAV_LINKS', function ($scope, $state, Auth, NAV_LINKS) {
  $scope.siteNavLinks = NAV_LINKS.internal;
}]);
