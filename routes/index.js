var express = require('express');
var router = express.Router();
const AuthController = require('../controllers/AuthController');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/logout', AuthController.destroy);

module.exports = router;
