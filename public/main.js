'use strict';

angular.module('areaBook',[
  'ui.router',
  'areaBook.resize',
  'areaBook.auth',
  'areaBook.totals',
  'areaBook.area',
  'areaBook.areaBook',
	'areaBook.main',
  'areaBook.menu'])
  .run(['$rootScope','$location','$http', function ($rootScope, $location, $http) {
    $rootScope.$on('$stateChangeStart', function (e, toState) {
      var check = false;
      if (toState && toState.auth) {
        $http.get('auth/isAuthenticated').then(function (resp) {
          if (!resp.data.auth) {
            $location.path('/auth');
          }
        });
      };
    });
  }])
  .config(['$stateProvider','$urlRouterProvider', function($stateProvider,$urlRouterProvider) {

    $stateProvider
      .state('auth', {
        url: '/auth',
        templateUrl: 'templates/auth.html',
        controller: 'authController'
      })
      .state('app', {
        url: '/app',
        templateUrl: 'templates/main.html',
        controller: 'mainController'
      })
      .state('app.menu', {
            url: '/menu',
            views: {
                'menu': {
                  templateUrl: 'templates/menu.html',
                  controller: 'menuController'
                }
            },
            auth: true
          })
      .state('app.menu.areaBook', {
        url: '/areaBook',
        views: {
          'content': {
            templateUrl: 'templates/areaBook.html',
            controller: 'areaBookController'
          }
        },
        auth: true
      })
      .state('app.menu.totals', {
            url: '/totals',
            views: {
                'content': {
                  templateUrl: 'templates/totals.html',
                  controller: 'totalsController'
                }
            },
            auth: true
          })
      .state('app.menu.church', {
            url: '/church',
            views: {
                'content': {
                  templateUrl: 'templates/church.html',
                  controller: 'churchController'
                }
            },
            auth: true
          })
      .state('app.menu.areas', {
            url: '/area',
            views: {
                'content': {
                  templateUrl: 'templates/area.html',
                  controller: 'areaController'
                }
            },
            auth: true
          });

		$urlRouterProvider.otherwise('/app/menu');
	}]);
