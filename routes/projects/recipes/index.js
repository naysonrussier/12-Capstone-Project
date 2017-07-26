'use strict';
//load modules
var express = require('express'),
  router = express.Router(),
  bodyParser = require('body-parser'),
  Datastore = require('nedb'),
  path = require('path');

//setup database
var db = {};
db.categories = new Datastore({
  filename: './src/api/data/categories.db',
  autoload: true
});
db.recipes = new Datastore({
  filename: './src/api/data/recipes.db',
  autoload: true
});
db.foodItems = new Datastore({
  filename: './src/api/data/foodItems.db',
  autoload: true
});

// recipes
var recipeRouter = require('./api/routes/recipeRoutes.js')(db.recipes, db.foodItems);
router.use('/api/recipes', recipeRouter);

// categories
var categoryRouter = require('./api/routes/categoryRoutes.js')(db.categories);
router.use('/api/categories', categoryRouter);

// food items
var foodItemRouter = require('./api/routes/foodItemRoutes.js')(db.foodItems);
router.use('/api/fooditems', foodItemRouter);

module.exports = router;