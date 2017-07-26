(function() {
  'use strict';

  /*
This file provides the necessary controllers for the 'loans' route
*/

	angular.module('app')
	.controller('apps', function($scope, $location) {
		$scope.project_path = $location.search().project_path + "/" + $location.search().project_name;
		$scope.fixed_project = function() {
			$('.iframe').toggleClass('mobile fixed')
		}
	});
})();
