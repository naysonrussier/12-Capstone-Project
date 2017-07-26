'use strict';

var express = require('express');
var parser = require('body-parser');
var router = express.Router();
var api = require('./api');

require('./seed');

router.use('/api', api);

module.exports = router;