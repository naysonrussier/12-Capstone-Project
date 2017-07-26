
(function() {
  'use strict';

	angular.module('app')
	.service("dataService", function($http) {
		
	  this.getRecipes = function(success, error) {
		$http.get('/projects-api/recipes/api/recipes')
		.then(success)
		.catch(error)
	  };
	  
	  this.getCategories = function(success, error) {
		$http.get('/projects-api/recipes/api/categories')
		.then(success)
		.catch(error)
	  };
	  
	  this.getFoodItems = function(success, error) {
		$http.get('/projects-api/recipes/api/fooditems')
		.then(success)
		.catch(error)
	  };
	  
	  this.getRecipesByCategory = function(category, success, error) {
		$http.get('/projects-api/recipes/api/recipes?category='+ category)
		.then(success)
		.catch(error)
	  }
	  
	  this.getRecipesById = function(id, success, error) {
		$http.get('/projects-api/recipes/api/recipes/'+ id)
		.then(success)
		.catch(error)
	  }
	  
	  this.updateRecipesById = function(id, recipe, success, error) {
		$http.put('/projects-api/recipes/api/recipes/'+id, recipe)
		.then(success)
		.catch(error)
	  }
	  
	  this.postRecipe = function(recipe, success, error) {
		$http.post('/projects-api/recipes/api/recipes', recipe)
		.then(success)
		.catch(error)
	  }
	  
	  this.delRecipeById = function(id, success, error) {
		$http.delete('/projects-api/recipes/api/recipes/'+id)
		.then(success)
		.catch(error)
	  }
	  
	});
})();