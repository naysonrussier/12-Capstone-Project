
(function() {
  'use strict';

/*
	This file provides the necessary code to fetch books data
*/
  
	angular.module('app')
	.service("DSBooks", function($http) {
	  
	  this.getBooks = function(success, error) {
		$http.get('/projects-api/library/api/books/list')
		.then(success)
		.catch(error)
	  };
	  
	  this.getBooksSearch = function(search, success, error) {
		$http.get('/projects-api/library/api/search/books/?search=' + search)
		.then(success)
		.catch(error)
	  };
	  
	  this.getBooksById = function(id, success, error) {
		$http.get('/projects-api/library/api/books/' + id)
		.then(success)
		.catch(error)
	  };
	  this.postBook = function(data, success, error) {
		$http.post('/projects-api/library/api/books/new', data)
		.then(success)
		.catch(error)
	  };
	  
	  this.updateBook = function(data, success, error) {
		$http.put('/projects-api/library/api/books/', data)
		.then(success)
		.catch(error)
	  };
	  
	});
})();