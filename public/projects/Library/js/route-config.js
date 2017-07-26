
(function() {
  'use strict';

  // The Angular $routeProvider is used to configure routes for this application.
  
  angular
    .module('app')
    .config(config);

  function config($routeProvider) {
    $routeProvider
	  .when('/', {
		title: 'home',
		templateUrl: '/templates/library_home'
	  })
      .when('/books', {
		title: 'Books List',
        controller: 'books',
        templateUrl: '/templates/library_books_list'
      })
      .when('/books/new', {
		title: 'New Book',
        controller: 'books',
        templateUrl: '/templates/library_books_new'
      })
      .when('/books/:id', {
		title: 'Book Details',
        controller: 'books',
        templateUrl: '/templates/library_books_detail'
      })
      .when('/loans', {
		title: 'Loans List',
        controller: 'loans',
        templateUrl: '/templates/library_loans_list'
      })
      .when('/loans/new', {
		title: 'New Loan',
        controller: 'loans',
        templateUrl: '/templates/library_loans_new'
      })
      .when('/loans/return', {
		title: 'Return Book',
        controller: 'loans',
        templateUrl: '/templates/library_loans_return'
      })
      .when('/patrons', {
		title: 'Patrons List',
        controller: 'patrons',
        templateUrl: '/templates/library_patrons_list'
      })
      .when('/patrons/new', {
		title: 'New Patron',
        controller: 'patrons',
        templateUrl: '/templates/library_patrons_new'
      })
      .when('/patrons/:id', {
		title: 'Patron Details',
        controller: 'patrons',
        templateUrl: '/templates/library_patrons_detail'
      })
  }
})();
