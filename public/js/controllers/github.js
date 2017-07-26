(function() {
  'use strict';

  /*
This file provides the necessary controllers for the 'loans' route
*/

	angular.module('app')
	.controller('github', function($scope, DB) {
		$scope.githubRepos = [];
		DB.getGithubRepo(function(res) {
			for (var i = 0; i < res.data.length; i ++) {
				if (!res.data[i].description) {
					res.data[i].description = "No description provided";
				}
			}
			$scope.githubRepos = res.data;
		})
	});
})();
