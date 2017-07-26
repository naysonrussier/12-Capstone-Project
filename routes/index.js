var express = require('express');
var router = express.Router();
var User = require('../Models/user');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('h_index', { title: 'Home' });
});

router.get('/loggedInUser', function(req, res, next) {
	console.log(req.session.userId)
	if(req.session.userId) {
		User.findById(req.session.userId)
		.exec(function(error, user) {
			if(error) {
				return next(error);
			} else {
				return res.json(user);
			}
		})
	} else {
		var err = new Error("You should be logged in to view these informations.");
		err.status = 403;
		return next(err);
	}
})
// GET /logout
router.get('/logout', function(req, res, next) {
	if (req.session) {
		//delete session object
		req.session.destroy(function(err) {
			if(err) {
				return next(err)
			} else {
				return res.redirect('/');
			}
		});
	}
});

router.post('/login', function(req, res, next) {
	if (req.body.email && req.body.password) {
		User.authenticate(req.body.email, req.body.password, function(error, user) {
			if (error || !user) {
				var err = new Error('Wrong email or password.');
				err.status = 401;
				return next(err);
			} else {
				req.session.userId = user._id;
				return res.redirect('/');
			}
		});
	} else {
		var err = new Error('Email and password are required');
		err.status = 401;
		return next(err);
	}
});

// POST /register
router.post('/register', function(req, res, next) {
	if (req.body.email && req.body.name && req.body.password && req.body.confirmPassword) {
		
		//confirm that user typed same password twice
		if (req.body.password !== req.body.confirmPassword) {
			var err = new Error('Passwords do not match. Please try again!');
			err.status = 400;
			return next(err);
		}
		
		// create object with form input
		var userData = {
			email: req.body.email,
			name: req.body.name,
			password: req.body.password
		};
		
		// use schema's 'create' method to insert document into Mongo
		User.create(userData, function(error, user) {
			if (error) {
				return next(error);
			} else {
				req.session.userId = user._id;
				return res.redirect('/');
			}
		});
		
	} else {
		var err = new Error('All fields required.');
		err.status = 400;
		return next(err);
	}
});




router.get('/templates/:template', function(req, res, next) {
	res.render(req.params.template);
});
module.exports = router;
