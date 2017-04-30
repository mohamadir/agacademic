var express = require('express');
var router = express.Router();
var Admin = require('../models/admin');

router.get('/login',checkAdmin, function(req, res, next) {
  res.render('login', { page: 'login' });
});

router.post('/login', function(req, res, next) {
  console.log(req.body);

  Admin.findOne({"user" : req.body.user},function(err,user){
  	console.log("im here");
  	if (err) throw err
  	if(!user){
  		res.render('login',{error:'المستخدم غير موجود'});


  	}
  	else
  	{
  		if(req.body.pass === user.password)
  		{
  			req.session.user=user;
  			res.redirect('/admin');
  		}
  		else
  		  res.render('login',{error:'كلمة المرور غير صحيحة'});

  	}
  });
});

router.post('/logout', function(req, res, next) {
  console.log("im in logout route");
  delete req.session.user;
  res.redirect('/auth/login');
});


function checkAdmin(req,res,next)
{
  if(req.session.user)
  {
    res.redirect('/admin');
  }
  else
    next();
}


module.exports = router;
