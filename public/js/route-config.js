
(function() {
  'use strict';

  // The Angular $routeProvider is used to configure routes for this application.
  
  angular
    .module('app')
    .config(config);

  function config($routeProvider) {
    $routeProvider
      .when('/', {
      title: 'Home',
      templateUrl: '/templates/h_home',
      controller: 'home'
      })
      .when('/github', {
      title: 'Github',
      templateUrl: '/templates/h_github',
      controller: 'github'
      })
      .when('/treehouse', {
      title: 'Home',
      templateUrl: '/templates/h_treehouse',
      controller: 'treehouse'
      })
      .when('/apps', {
      title: 'Apps',
      templateUrl: '/templates/h_apps',
      controller: 'apps'
      })
      .when('/login', {
      title: 'Login Page',
      templateUrl: '/templates/h_login'
      })
      .when('/register', {
      title: 'Registration Page',
      templateUrl: '/templates/h_register'
      })
  }
})();
