
(function() {
  'use strict';

	angular.module('app').run(['$rootScope', function($rootScope) {
		$rootScope.$on('$routeChangeSuccess', function (event, current, previous, github) {
			$rootScope.title = current.$$route.title;
		});
		$('.navbar .navbar-collapse .navbar-nav .nav-item').click(function() {
			$('.navbar .navbar-collapse .navbar-nav .nav-item').removeClass('active');
			$(this).addClass('active');
		})
	}]);
})();
