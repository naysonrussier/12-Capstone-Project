(function() {
  'use strict';
  
/*
This file provides the necessary controllers for the 'books' route
*/

	angular.module('app')
		.controller("books", function($scope, DSBooks, DSLoans, $location, $routeParams) {
			
			$scope.config = {
				currentPage: 1,
				pageSize: 10
			}
			
			$scope.BooksList = [];
			
			$scope.BookId = $location.path().substr(7);
			
			$scope.BookDetail = {};
			
			$scope.BookNew = {"title":"","author":"","genre":"","first_published":""};
			
			$scope.search = "";
			
			$scope.LoansByBook = [];
			
			$scope.BooksState = {state: 0, states: ['All books', 'Overdue Books', 'Checked Out Books']};
			
			$scope.errors = [];
			
			$scope.getlist_all = function() {
				DSBooks.getBooks(function(res) {
					$scope.BooksList = res.data;
					$scope.BooksState.state = 0;
				});	
			}
			
			$scope.getlist_search = function() {
				if($scope.search != "") {
					DSBooks.getBooksSearch($scope.search, function(res) {
						$scope.BooksList = res.data;
					});	
				} else {
					$scope.getlist_all();
				}
			}
			
			$scope.getlist_overdue = function() {
				DSLoans.getLoans_overdue(function(res) {
					$scope.BooksList = parseJson(res.data);
					$scope.BooksState.state = 1;
				});
			};
			
			$scope.getlist_checked = function() {
				DSLoans.getLoans_checked(function(res) {
					$scope.BooksList = parseJson(res.data);
					$scope.BooksState.state = 2;
				});
			};
			
			$scope.getBooksById = function() {
				DSBooks.getBooksById($scope.BookId, function(res) {
					$scope.BookDetail = res.data[0];
				});
			}
			
			$scope.getLoansByBook = function() {
				DSLoans.getLoansByBook($scope.BookId, function(res) {
					$scope.LoansByBook = res.data;
				});
			}
			
			$scope.postNewBook = function() {
				DSBooks.postBook($scope.BookNew, function(res) {
					$location.path('/books')
				}, function(res) {
					$scope.errors = [];
					for(var i = 0; i < res.data.errors.length; i ++) {
						$scope.errors.push(error(res.data.errors[i]));
					}
				});
			}
			
			$scope.updateBook = function() {
				DSBooks.updateBook($scope.BookDetail, function(res) {
					$location.path('/books')
				}, function(res) {
					$scope.errors = [];
					for(var i = 0; i < res.data.errors.length; i ++) {
						$scope.errors.push(error(res.data.errors[i]));
					}
				});
			}
			
			if($scope.BookId == "") {
				if($routeParams.filter == 'overdue') {
					$scope.getlist_overdue()
				} else if($routeParams.filter == 'checked') {
					$scope.getlist_checked()
				} else {
					$scope.getlist_all()
				}
			} else {
				$scope.getBooksById();
				$scope.getLoansByBook()
			}
			
			function parseJson(data) {
				var json = [];
				for(var i = 0; i < data.length; i++) {
					json.push(data[i].book);
				}
				return json;
			}
		});
})();