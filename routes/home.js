var express = require('express');
var router = express.Router();
const accountcontroller = require('../controllers/AccountController');

router.get('/', function(req, res, next) {
  if(req.session.loggedin) {
    res.render('home');
  } else {
    res.redirect('/login');
  }
});

router.post('/change-password', function(req, res, next){
  accountcontroller.show;
});

module.exports = router;
