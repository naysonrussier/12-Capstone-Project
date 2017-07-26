
(function() {
  'use strict';

/*
This file provides the necessary controllers for the 'patrons' route
*/

	angular.module('app')
	.controller('treehouse', function($scope, DB) {
		$scope.treehouseProfile = {name: "Name", gravatar_url: "/img/gravatar.png"};
		DB.getTreehouseProfile(function(data) {
			for (var i = 0; i < data.data.badges.length; i ++) {
				var day = data.data.badges[i].earned_date;
				var date = new Date(day);
				data.data.badges[i].earned_date = date.toDateString();
			}
			$scope.treehouseProfile = data.data;
		});
	});
})();
