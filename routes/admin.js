var express = require('express');
var router = express.Router();
var Admin = require('../models/admin');

router.get('/',checkLogin, function(req, res, next) {
  res.render('admin', { page: 'admin' });
});

function checkLogin(req,res,next)
{
  if(!req.session.user)
  {
    res.redirect('/auth/login');
  }
  else
    next();
}

module.exports = router;
