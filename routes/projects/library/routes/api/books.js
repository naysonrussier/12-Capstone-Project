var express = require('express');
var router = express.Router();
var Books = require('../../models').books;
var Loans = require('../../models').loans;

/* GET Books List */
router.get('/list', function(req, res, next) {
	Books.findAll({
	  include:[Loans]
	}).then(function(books) {
		res.send(books);
	}).catch(function(error) {
		res.status(500);
		res.send(error);
	});
});

/* GET a Book with a specific ID */
router.get('/:id', function(req, res, next) {
	Books.findAll({
	  where: {id: req.params.id}
	}).then(function(books) {
		res.send(books);
	}).catch(function(error) {
		res.status(500);
		res.send(error);
	});
});

/* UPDATE a Book */
router.put('/', function(req, res, next) {
	Books.update({
	  title: req.body.title,
	  author: req.body.author,
	  genre: req.body.genre,
	  first_published: req.body.first_published,
	},{
		where: {
			id: req.body.id
		}
	}).then(function(books) {
		res.send(books);
	}).catch(function(error) {
		res.status(500);
		res.send(error);
	});
});

/* Create a New Book */
router.post('/new', function(req, res, next) {
	Books.create({
	  title: req.body.title,
	  author: req.body.author,
	  genre: req.body.genre,
	  first_published: req.body.first_published
	}).then(function(books) {
		res.send(books);
	}).catch(function(error) {
		res.status(500);
		res.send(error);
	});
	console.log(req);
});

module.exports = router;
