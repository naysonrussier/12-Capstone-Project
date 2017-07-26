(function() {
  'use strict';

  /*
This file provides the necessary controllers for the 'loans' route
*/

	angular.module('app')
	.controller('loans', function($scope, DSLoans, DSPatrons, DSBooks, $location, $routeParams) {
			
		$scope.config = {
			currentPage: 1,
			pageSize: 10
		}
		
		$scope.LoansList = [];
		
		$scope.LoanId = $routeParams.id;
		
		$scope.LoanDetail = [];
		
		$scope.LoanNew = {book_id: "",loaned_on: "",patron_id: "",return_by: ""};
		
		$scope.LoansState = {state: 0, states: ['All Loans', 'Overdue Loans', 'Checked Out Loans']};
		
		$scope.BooksList = [];
		
		$scope.PatronsList = [];
		
		$scope.errors = [];
		
		$scope.getlist_all = function() {
			DSLoans.getLoans(function(res) {
				$scope.LoansList = res.data;
				$scope.LoansState.state = 0;
			});
		};
		
		$scope.getlist_overdue = function() {
			DSLoans.getLoans_overdue(function(res) {
				$scope.LoansList = res.data;
				$scope.LoansState.state = 1;
			});
		};
		
		$scope.getlist_checked = function() {
			DSLoans.getLoans_checked(function(res) {
				$scope.LoansList = res.data;
				$scope.LoansState.state = 2;
			});
		};
		
		$scope.getLoanById = function() {
			DSLoans.getLoansById($scope.LoanId, function(res) {
				$scope.LoanDetail = res.data[0];
				$scope.date_returnedOn();
			});
		};
		
		$scope.getBooksList = function() {
			DSBooks.getBooks(function(books) {
				DSLoans.getLoans_checked(function(loans) {
					$scope.BooksList = books.data;
					for(var i = 0; i < books.data.length; i ++) {
						for(var j = 0; j < loans.data.length; j ++) {
							if(books.data[i].id == loans.data[j].book_id) {
								$scope.BooksList[i].checked = true;
							}
						}
					}
				});
			});
		};
		
		$scope.getPatronsList = function() {
			DSPatrons.getPatrons(function(res) {
				$scope.PatronsList = res.data;
			});
		};
		
		$scope.postNewLoan = function() {
			DSLoans.postLoan($scope.LoanNew ,function(res) {
				$location.path('/loans')
			}, function(res) {
				$scope.errors = [];
				for(var i = 0; i < res.data.errors.length; i ++) {
					$scope.errors.push(error(res.data.errors[i]));
				}
			});
		};
	
		$scope.returnBook = function() {
			DSLoans.updateLoan($scope.LoanDetail, function(res) {
				$location.path('/loans');
				$location.search('id', null); 
			}, function(res) {
				$scope.errors = [];
				for(var i = 0; i < res.data.errors.length; i ++) {
					$scope.errors.push(error(res.data.errors[i]));
				}
			});
		};
		
		$scope.date_returnBy = function() {
			var timestamp = Date.parse($scope.LoanNew.loaned_on);
			if (!isNaN(timestamp)) {
				var date = new Date($scope.LoanNew.loaned_on);
				date.setDate(date.getDate() + 7);
				date = date.toISOString().split('T')[0];
				$scope.LoanNew.return_by = date;
			}
		}
		
		$scope.date_returnedOn = function() {
				var date = new Date().toISOString().split('T')[0];
				$scope.LoanDetail.returned_on = date;
		}
		
		if(!$scope.LoanId) {
			if($routeParams.filter == 'overdue') {
				$scope.getlist_overdue()
			} else if($routeParams.filter == 'checked') {
				$scope.getlist_checked()
			} else {
				$scope.getlist_all()
			}
		} else {
			$scope.getLoanById();
		};
		
		$scope.getBooksList();
		$scope.getPatronsList();
		
	});
})();
