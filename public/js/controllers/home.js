(function() {
  'use strict';
  
/*
This file provides the necessary controllers for the 'books' route
*/

	angular.module('app')
		.controller("home", function($scope, DB) {
			$scope.githubData;
			DB.getThreeGithubRepo(function(res) {
				$scope.githubData = res.data;
			});
			$scope.slickConfig = {
			    enabled: true,
			    autoplay: true,
			    autoplaySpeed: 6000
			};
			$('#contact form').submit(function( event ) {
				event.preventDefault();
			  	$(this).parent('.contact').addClass('loading');
				$.post('/api/1.0/email/send', $(this).serialize(), function(res) {
					$('#contact form').parent('.contact').removeClass('loading');
					$('#contact form button').text(res);
					setTimeout(function() {
						$('.contact form button').text('Submit');
					}, 3000)
				});
				
			});
		});
})();