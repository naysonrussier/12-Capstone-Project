'use strict'

var express = require('express');
var router = express.Router();
var https = require('https');
var http = require('http');
var sendmail = require('sendmail')({silent: false})

/* GET users listing. */
router.get('/github/repo', function(req, res, next) {
	var options = {
		host: 'api.github.com',
		path: '/users/naysonrussier/repos',
		method: 'GET',
		headers: {
			'User-Agent': 'request'
		}
	};
	var request = https.get(options, function(response) {
		var body = "";
		if (response.statusCode !== 200) {
			request.abort();
			console.log(response)
			return res.send("There was an error getting my repos. ( [" + response.statusCode + "] " + http.STATUS_CODES[response.statusCode] + ")");
		}
		response.on('data', function (chunk) {
			body += chunk;
		});
		response.on('end', function () {
			if(response.statusCode === 200) {
				try {
					var repo = JSON.parse(body);
					if(req.query.limit) {
						var temp = [];
						for(var i  = 0; i < repo.length; i ++) {
							if(i < parseInt(req.query.limit)) {
								temp.push(repo[i]);
							}
						}
						repo = temp;
					}
					return res.json(repo);
				} catch (error) {
					return res.send(error);
				}
			}
		}).on("error", function(error){
			return res.send(error);
		});
	});
});

router.get('/treehouse/profile', function(req, res, next) {
	var username = "naysrussier";
	var request = https.get("https://teamtreehouse.com/" + username + ".json", function(response) {
		var body = "";
		if (response.statusCode !== 200) {
			request.abort();
			return res.send(new Error("There was an error getting my profile. (" + https.STATUS_CODES[response.statusCode] + ")"));
		}
		response.on('data', function (chunk) {
			body += chunk;
		});
		response.on('end', function () {
			if(response.statusCode === 200) {
				try {
					var profile = JSON.parse(body);
					return res.json(profile);
				} catch (error) {
					return res.send(error);
				}
			}
		}).on("error", function(error){
			return res.send(error);
		});
	});
});

router.post('/email/send', function(req, res, next) {
	sendmail({
	  from: 'nayson.russier@student-clc.fr',
	  to: 'nayson.russier@student-clc.fr',
	  replyTo: req.body.email,
	  subject: 'Contact on website',
	  html: 'From: ' + req.body.name + '</br>Message :</br>' + req.body.message
	}, function (err, reply) {
		if(!err) {
			res.send('Message sent!')
		} else {
			var error = new Error(err);
			return next(error);
		}
	});
});

module.exports = router;
