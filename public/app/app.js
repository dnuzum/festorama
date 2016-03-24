var app = angular.module('FestoramaApp', ['ui.router', 'FestivalCtrls', 'ui.bootstrap']);

app.config([
  '$stateProvider',
  '$urlRouterProvider',
  '$locationProvider',
  function($stateProvider, $urlRouterProvider, $locationProvider) {

  $urlRouterProvider.otherwise('/404');

  $stateProvider
  .state('home', {
    url: '/',
    templateUrl: 'app/views/home.html'
  })
  .state('festival',{
    url: '/festivals',
    templateUrlL 'app/views/festivals.html',
    constroller: 'FestCtrl'
  })
  .state('newFestival', {
    url: '/festivals/new',
    templateUrl: 'app/views/newFestival.html',
    controller: 'NewCtrl'
  })
  .state('festivalShow', {
    url: '/festivals/:id',
    templateUrl: 'app/views/showFestival.html',
    controller: 'ShowCtrl'
  })
  .state('signup', {
    url: '/signup',
    templateUrl: 'app/views/userSignup.html',
    controller: 'SignupCtrl'
  })
  .state('login', {
    url: '/login',
    templateUrl: 'app/views/userLogin.html',
    controller: 'LoginCtrl'
  })
  .state('404', {
    url: '/404',
    templateUrl: 'app/views/404.html'
  });

  $locationProvider.html5Mode(true);
}])

.config(['$httpProvider', function($httpProvider) {
  $httpProvider.interceptors.push('AuthInterceptor');
}])
