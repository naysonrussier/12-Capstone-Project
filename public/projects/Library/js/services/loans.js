(function() {
  'use strict';
  
  /*
	This file provides the necessary code to fetch loans data
*/

	angular.module('app')
	.service("DSLoans", function($http) {
	 
	  this.getLoans = function(success, error) {
		$http.get('/projects-api/library/api/loans/list')
		.then(success)
		.catch(error)
	  };
	  
	  this.getLoansById = function(id, success, error) {
		$http.get('/projects-api/library/api/loans/' + id)
		.then(success)
		.catch(error)
	  };
	    
	  this.getLoans_overdue = function(success, error) {
		$http.get('/projects-api/library/api/loans/overdue')
		.then(success)
		.catch(error)
	  };
	  
	  this.getLoans_checked = function(success, error) {
		$http.get('/projects-api/library/api/loans/checked')
		.then(success)
		.catch(error)
	  };
	  
	  this.getLoansByBook = function(id, success, error) {
		$http.get('/projects-api/library/api/loans/filterbybook/' + id)
		.then(success)
		.catch(error)
	  };
	  
	  this.getLoansByPatron = function(id, success, error) {
		$http.get('/projects-api/library/api/loans/filterbypatron/' + id)
		.then(success)
		.catch(error)
	  };
	  
	  this.postLoan = function(data, success, error) {
		$http.post('/projects-api/library/api/loans/new', data)
		.then(success)
		.catch(error)
	  };
	  
	  this.updateLoan = function(data, success, error) {
		$http.put('/projects-api/library/api/loans/return/', data)
		.then(success)
		.catch(error)
	  };
	    
	});
})();