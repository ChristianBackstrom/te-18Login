var express = require('express');
var router = express.Router();
const { body, validationResult } = require('express-validator');
const accountcontroller = require('../controllers/AccountController');

router.get('/', function(req, res, next) {
  if(req.session.loggedin) {
    res.render('home');
  } else {
    res.redirect('/login');
  }
});

router.get('/change', accountcontroller.show);

router.post('/change',
    body('lastPassword').notEmpty(),
    body('newPassword').notEmpty(),
    body('confirmPassword').custom((value, { req }) => {
      if (value !== req.body.newPassword) {
        throw new Error('Password confirmation does not match password');
      }
      // Indicates the success of this synchronous custom validator
      return true;
    }),
     accountcontroller.update);

module.exports = router;
