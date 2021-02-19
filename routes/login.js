const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { query } = require('../models/db');
const { body, validationResult } = require('express-validator');




/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('form', {title: 'Schoolsoft'});
});

/* B-crypt */
router.get('/kryptan/:pwd', function(req, res, next) {

    const myPlaintextPassword = req.params.pwd;

    bcrypt.hash(myPlaintextPassword, 1, function(err, hash) {
        // Store hash in your password DB.
        res.json({
            pwd: hash
        });
    });
});

/* post login */
router.post('/', 
    body('username').notEmpty().trim(), 
    body('password').notEmpty(), 
    async function(req, res, next) {

    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render('form',{ errors: errors.array() });
    }

    console.log(req.body);



    const username = req.body.username;
    const password = req.body.password;

    try{
        const sql = 'SELECT password FROM users WHERE name = ?';
        const result = await query(sql, username);
        // Load hash from your password DB.
        if(result.length > 0){
            bcrypt.compare(password, result[0].password, function(err, result) {
                if (result == true){
                    req.session.loggedin = true;
                    req.session.username = username;
                    res.redirect('/home');
                } else {
                    res.render('form', {
                        error: 'Username or password is invalid', msg: 'Username or password is invalid'
                    });
                }
            });
        } else {
            res.render('form', {error: 'Username or password is invalid', msg: 'Username or password is invalid'});
        }
    } catch (e) {
        next(e);
        console.error(e);
    }
});

module.exports = router;
