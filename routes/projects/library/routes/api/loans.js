var express = require('express');
var router = express.Router();
var Loans = require('../../models').loans;
var Books = require('../../models').books;
var Patrons = require('../../models').patrons;

/* GET Loans List */
router.get('/list', function(req, res, next) {
	Loans.findAll({
	  include: [Books, Patrons]
	}).then(function(loans) {
		res.send(loans);
	}).catch(function(error) {
		res.status(500);
		res.send(error);
	});
});

/* GET Overdue Loans */
router.get('/overdue', function(req, res, next) {
	Loans.findAll({
	  include: [Books, Patrons],
	  where: {returned_on: null, return_by: {$lt: new Date()}}
	}).then(function(books) {
		res.send(books);
	}).catch(function(error) {
		res.status(500);
		res.send(error);
	});
});

/* GET Checked Out Loans */
router.get('/checked', function(req, res, next) {
	Loans.findAll({
	  include: [Books, Patrons],
	  where: {returned_on: null}
	}).then(function(books) {
		res.send(books);
	}).catch(function(error) {
		res.status(500);
		res.send(error);
	});
});

/* GET Loan With a specific ID */
router.get('/:id', function(req, res, next) {
	Loans.findAll({
	  include: [Books, Patrons],
	  where: {id: req.params.id}
	}).then(function(books) {
		res.send(books);
	}).catch(function(error) {
		res.status(500);
		res.send(error);
	});
});

/* GET Loans List with a specific book_id */
router.get('/filterbybook/:id', function(req, res, next) {
	Loans.findAll({
	  include: [Books, Patrons],
	  where: {book_id: req.params.id}
	}).then(function(books) {
		res.send(books);
	}).catch(function(error) {
		res.status(500);
		res.send(error);
	});
});

/* GET Loans List with a specific patron_id */
router.get('/filterbypatron/:id', function(req, res, next) {
	Loans.findAll({
	  include: [Books, Patrons],
	  where: {patron_id: req.params.id}
	}).then(function(books) {
		res.send(books);
	}).catch(function(error) {
		res.status(500);
		res.send(error);
	});
});

/* Create a New Loan */
router.post('/new', function(req, res, next) {
	Loans.create({
		book_id: req.body.book_id,
		patron_id: req.body.patron_id,
		loaned_on: req.body.loaned_on,
		return_by: req.body.return_by
	}).then(function(loans) {
		res.send(loans);
	}).catch(function(error) {
		res.status(500);
		res.send(error);
	});
});

/* Update a Loan */
router.put('/return', function(req, res, next) {
	Loans.update({
	  returned_on: req.body.returned_on
	}, {
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

module.exports = router;
