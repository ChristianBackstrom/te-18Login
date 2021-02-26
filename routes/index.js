var express = require('express');
var router = express.Router();
const AuthController = require('../controllers/AuthController');
const accountcontroller = require('../controllers/AccountController');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/logout', AuthController.destroy);

router.post('/change', accountcontroller.show);

module.exports = router;
