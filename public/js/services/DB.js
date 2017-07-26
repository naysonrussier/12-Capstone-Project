
(function() {
  'use strict';

/*
	This file provides the necessary code to fetch books data
*/
  
	angular.module('app')
	.service("DB", function($http) {
	  
	  this.getGithubRepo = function(success, error) {
		$http.get('/api/1.0/github/repo')
		.then(success)
		.catch(error)
	  };
	  
	  this.getThreeGithubRepo = function(success, error) {
		$http.get('/api/1.0/github/repo?limit=3')
		.then(success)
		.catch(error)
	  };

	  this.getTreehouseProfile = function(success, error) {
		$http.get('/api/1.0/treehouse/profile')
		.then(success)
		.catch(error)
	  };

	  this.getLoggedInUserInfo = function(success, error) {
	  	$http.get('/loggedInUser')
	  	.then(success)
	  	.catch(error)
	  }
	});
})();