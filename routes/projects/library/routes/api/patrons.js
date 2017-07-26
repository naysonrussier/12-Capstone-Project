var express = require('express');
var router = express.Router();
var Patrons = require('../../models').patrons;

/* GET Patrons List */
router.get('/list', function(req, res, next) {
	Patrons.findAll({
	  attributes: { exclude: ['createdAt', 'updatedAt']}
	}).then(function(patrons) {
		res.send(patrons);
	}).catch(function(error) {
		res.status(500);
		res.send(error);
	});
});

/* GET Patron with a specific ID */
router.get('/:id', function(req, res, next) {
	Patrons.findAll({
	  attributes: { exclude: ['updatedAt', 'createdAt']},
	  where: {id: req.params.id}
	}).then(function(loans) {
		res.json(loans);
	}).catch(function(error) {
		res.status(500);
		res.send(error);
	});
});

/* POST a New Patron */
router.post('/new', function(req, res, next) {
	Patrons.create({
	  first_name: req.body.first_name,
	  last_name: req.body.last_name,
	  address: req.body.address,
	  email: req.body.email,
	  library_id: req.body.library_id,
	  zip_code: req.body.zip_code
	}).then(function(loans) {
		res.send(loans);
	}).catch(function(error) {
		res.status(500);
		res.send(error);
	});
});

/* Update a Patron */
router.put('/', function(req, res, next) {
	Patrons.update({
	  first_name: req.body.first_name,
	  last_name: req.body.last_name,
	  address: req.body.address,
	  email: req.body.email,
	  library_id: req.body.library_id,
	  zip_code: req.body.zip_code
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
	console.log(req);
});

module.exports = router;
