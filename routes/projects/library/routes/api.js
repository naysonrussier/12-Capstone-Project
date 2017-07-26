var express = require('express');
var router = express.Router();

var patrons = require('./api/patrons');
var loans = require('./api/loans');
var books = require('./api/books');
var search = require('./api/search');

/* GET users listing. */
router.use('/books', books);
router.use('/loans', loans);
router.use('/patrons', patrons);
router.use('/search', search);

module.exports = router;
