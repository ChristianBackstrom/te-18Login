const bcrypt = require('bcrypt');
const { query } = require('../models/db');
const { body, validationResult } = require('express-validator');
const { render } = require('../app');

module.exports.show = async function(req, res, next) {
    //logiken för att visa login form
        res.render('form', {title: 'Schoolsoft'});
};

module.exports.store = async function(req, res, next) {
    //logiken för att logga in användaren
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.render('form',{ errors: errors.array() });
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
                        error: 'Username or password is invalid',
                        msg: ''
                    });
                }
            });
        } else {
            res.render('form', {error: 'Username or password is invalid', msg: ''});
        }
    } catch (e) {
        next(e);
        console.error(e);
    }
};

module.exports.destroy = async function(req, res, next) {
    //logga ut användaren
    req.session.loggedin = false;
    req.session.destroy();
    return res.redirect('/');
};