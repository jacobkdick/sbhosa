/*global angular*/
/*jslint node:true*/
'use strict';

angular
.module('hosaApp', [
  'firebase',
  'ui.router',
])
.config(function ($stateProvider, $urlRouterProvider) {
  $stateProvider
  /*.state('admin', {
    url: '/admin',
    views: {
      '': {
        templateUrl: 'pg/views/admin/index.html',
        controller: 'adminCtrl',
      },
    },
    resolve: {
      auth: function ($state, authFac) {
        return authFac.$requireSignIn().catch(function () {
          $state.go('home');
        });
      }
    },
  })*/
  .state('home', {
    url: '/',
    views: {
      '': {
        templateUrl: 'pg/views/home/index.html',
        controller: 'homeCtrl',
      },
    },
  })
  /*.state('login', {
    url: '/login',
    views: {
      '': {
        templateUrl: 'pg/views/login/index.html',
        controller: 'loginCtrl',
      },
    },
  });*/

  $urlRouterProvider.otherwise('/');
})
.run(function ($rootScope) {
  // On state change, scroll to top
  // http://stackoverflow.com/a/22420145/5623385
  $rootScope.$on('$stateChangeSuccess',function(){
    $("html, body").animate({ scrollTop: 0 }, 0);
  });
})
.run(['$rootScope', '$state', function ($rootScope, $state) {
  $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
    if (error === 'AUTH_REQUIRED') {
      $state.go('home');
    }
  });
}]);
