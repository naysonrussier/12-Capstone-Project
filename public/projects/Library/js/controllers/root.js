
(function() {
  'use strict';

	angular.module('app').run(['$rootScope', function($rootScope) {
		$rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
			$rootScope.title = current.$$route.title;
		});
	}]);
})();
