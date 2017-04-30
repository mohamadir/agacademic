var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { page: 'home' });
});

router.get('/team', function(req, res, next) {
  res.render('team', { page: 'team' });
});

router.get('/artical', function(req, res, next) {
  res.render('artical', { page: 'artical' });
});


module.exports = router;
