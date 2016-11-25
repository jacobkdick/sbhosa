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
  .state('admin', {
    url: '/admin',
    views: {
      '': {
        templateUrl: 'pg/views/admin/index.html',
        controller: 'adminCtrl',
      },
      'footer@admin': {
        templateUrl: 'pg/templates/footer.html',
        controller: 'adminCtrl',
      },
      'navbar@admin': {
        templateUrl: 'pg/templates/navbar.html',
        controller: 'adminCtrl',
      },
    },
    resolve: {
      auth: function ($state, Auth) {
        return Auth.$requireSignIn().catch(function () {
          $state.go('login');
        });
      }
    },
  })
  .state('home', {
    url: '/',
    views: {
      '': {
        templateUrl: 'pg/views/home/index.html',
        controller: 'homeCtrl',
      },
      'footer@home': {
        templateUrl: 'pg/templates/footer.html',
        controller: 'homeCtrl',
      },
      'header@home': {
        templateUrl: 'pg/views/home/header.html',
        controller: 'homeCtrl',
      },
      'navbar@home': {
        templateUrl: 'pg/templates/navbar.html',
        controller: 'homeCtrl',
      },
      'sidebar@home': {
        templateUrl: 'pg/views/home/sidebar.html',
        controller: 'homeCtrl',
      },
      'tabs@home': {
        templateUrl: 'pg/views/home/tabs.html',
        controller: 'homeCtrl',
      },
    },
  })
  .state('login', {
    url: '/login',
    views: {
      '': {
        templateUrl: 'pg/views/login/index.html',
        controller: 'loginCtrl',
      },
      'footer@login': {
        templateUrl: 'pg/templates/footer.html',
        controller: 'loginCtrl',
      },
      'loginCard@login': {
        templateUrl: 'pg/views/login/loginCard.html',
        controller: 'loginCtrl',
      },
      'navbar@login': {
        templateUrl:  'pg/templates/navbar.html',
        controller: 'loginCtrl',
      },
    },
  });

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
}])
.constant('NAV_LINKS', {
  internal: [
    {
      name: 'Home',
      sref: 'home',
    },
    {
      name: 'Services',
      sref: 'services',
    },
    {
      name: 'Values',
      sref: 'values',
    },
    {
      name: 'Contact',
      sref: 'contact',
    },
  ],
  external: [
    {
      name: 'IRS',
      href: 'https://www.irs.gov/',
    },
    {
      name: 'QuickBooks Online',
      href: 'https://qbo.intuit.com/qbo36/login',
    },
  ],
});
