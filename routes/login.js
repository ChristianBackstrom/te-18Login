var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('form', {title: 'Schoolsoft'});
});

/* post login */
router.post('/', function(req, res, next) {

    console.log(req.body);

    const username = req.body.username;
    const password = req.body.password;

    //logga in med DOLD tvåFaktorLogin
    if (password == "bajs"){
        res.render('form', {title:'du vann'});
    }else {
        res.render('form', {title: 'Schoolsoft'}, {desc: 'wrong username or password'});
    }
});

module.exports = router;
