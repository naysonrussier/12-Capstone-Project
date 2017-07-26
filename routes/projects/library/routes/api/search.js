var express = require('express');
var router = express.Router();
var Books = require('../../models').books;
var Patrons = require('../../models').patrons;
var Loans = require('../../models').loans;

/* GET users listing. */
router.get('/books/', function(req, res, next) {
	Books.findAll({
		where: {
			$or: [
			  { 'title': { like: '%' + req.query.search + '%' } },
			  { 'author': { like: '%' + req.query.search + '%' } },
			  { 'genre': { like: '%' + req.query.search + '%' } },
			  { 'first_published': { like: '%' + req.query.search + '%' } }
			]
		}
	}).then(function(books) {
		res.send(books);
	}).catch(function(error) {
		res.status(500);
		res.send(error);
	});
});

router.get('/patrons/', function(req, res, next) {
	Patrons.findAll({
		where: {
			$or: [
			  { 'first_name': { like: '%' + req.query.search + '%' } },
			  { 'last_name': { like: '%' + req.query.search + '%' } },
			  { 'address': { like: '%' + req.query.search + '%' } },
			  { 'email': { like: '%' + req.query.search + '%' } },
			  { 'library_id': { like: '%' + req.query.search + '%' } },
			  { 'zip_code': { like: '%' + req.query.search + '%' } }
			]
		}
	}).then(function(patrons) {
		res.send(patrons);
	}).catch(function(error) {
		res.status(500);
		res.send(error);
	});
});

module.exports = router;
