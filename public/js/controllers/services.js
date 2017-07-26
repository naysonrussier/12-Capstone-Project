(function() {
  'use strict';

  /*
This file provides the necessary controllers for the 'loans' route
*/

	angular.module('app')
	.controller('services', function($scope, DB) {
		DB.getLoggedInUserInfo(function(data) {
			if(data) {
				$scope.loggedInUser = data.data;
			}
		}, function(error) {

		});
	});
})();
