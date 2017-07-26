
(function() {
  'use strict';

/*
This file provides the necessary controllers for the 'patrons' route
*/

	angular.module('app')
	.controller('patrons', function($scope, DSLoans, DSPatrons, $location, $routeParams) {
			
		$scope.config = {
			currentPage: 1,
			pageSize: 10
		}
	
		$scope.PatronsList = [];
		
		$scope.PatronId = $location.path().substr(9);
		
		$scope.PatronDetail = [];
		
		$scope.PatronNew = {first_name: "", last_name: "", address: "", email: "", library_id: "", zip_code: ""};
		
		$scope.search = "";
			
		$scope.BooksState = {state: 0, states: ['Patrons', 'Search']};
					
		$scope.LoansByPatron = [];
		
		$scope.errors = [];
		
		$scope.getPatronsList = function() {
			DSPatrons.getPatrons(function(res) {
				$scope.PatronsList = res.data;
				$scope.BooksState.state = 0;
			});
		}
		
		$scope.getPatronsSearch = function() {
			
			if($scope.search != "") {
				DSPatrons.getPatronsSearch($scope.search, function(res) {
					$scope.PatronsList = res.data;
					$scope.BooksState.state = 0;
				});
			} else {
				$scope.getPatronsList();
			}
		}
		
		$scope.getPatronDetail = function() {
			DSPatrons.getPatronsById($scope.PatronId, function(res) {
				$scope.PatronDetail = res.data[0];
			});
		};
		
		$scope.newPatron = function() {
			DSPatrons.postPatrons($scope.PatronNew, function(res) {
				$location.path('/patrons');
				console.log(res);
			}, function(res) {
				$scope.errors = [];
				for(var i = 0; i < res.data.errors.length; i ++) {
					$scope.errors.push(error(res.data.errors[i]));
				}
			});
		};
		
		$scope.updatePatron = function() {
			DSPatrons.updatePatron($scope.PatronDetail, function(res) {
				$location.path('/patrons')
			}, function(res) {
				$scope.errors = [];
				for(var i = 0; i < res.data.errors.length; i ++) {
					$scope.errors.push(error(res.data.errors[i]));
					console.log(error(res.data.errors[i]))
				}
			});
		};
		
		$scope.getLoansByPatron = function() {
			DSLoans.getLoansByPatron($scope.PatronId, function(res) {
				$scope.LoansByPatron = res.data;
			});
		}
		
		if($scope.PatronId == "") {
			if($routeParams.filter == 'search') {
				$scope.getPatronsSearch()
			} else {
				$scope.getPatronsList();
			}
		} else {
			$scope.getLoansByPatron();
			$scope.getPatronDetail();
		}
	
	});
})();
