var express = require('express');
var router = express.Router();
var todo = require('./projects/todo/app');
var recipes = require('./projects/recipes/index');
var library = require('./projects/library/app');

/* GET users listing. */
router.use('/todo', todo);
router.use('/recipes', recipes);
router.use('/library', library);

module.exports = router;
