var express = require('express');
var router = express.Router();
var sequelize = require("./models").sequelize;

var api = require('./routes/api');

sequelize.sync().then(function() {});

router.use('/api', api);

router.get('/:template', function(req, res) {
	res.render(req.params.template);
});

router.get('/', function(req, res) {
	res.render('library_layout');
});


// catch 404 and forward to error handler
router.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
router.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
console.log(err);
  // render the error page
  res.status(err.status || 500);
  res.render('library_error');
});

module.exports = router;
