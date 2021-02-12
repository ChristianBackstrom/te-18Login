const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { query } = require('../models/db')


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
router.post('/', async function(req, res, next) {

    console.log(req.body);



    const username = req.body.username;
    const password = req.body.password;

    if (username && password) {
        try{
            const sql = 'SELECT password FROM users WHERE name = ?';

            const result = await query(sql, username);

            // Load hash from your password DB.
            bcrypt.compare(password, result[0].password, function(err, result) {
                if (result == true){
                    req.session.loggedin = true;
                    req.session.username = username;
                    res.redirect('/topsecret');
                } else {
                    res.render('form', {
                        msg: 'wrong username or password'
                    }
                    )
                }
            });
        } catch (e) {
            next(e);
            console.error(e);
        }
    } else {
        res.redirect('form', {msg: 'not given username and password'});
    }

    //logga in med DOLD tvåFaktorLogin
    // if (password == "bajs"){
    //     //kod för att kolla uppgifter med db
    //     //om login rätt sätt session
        
    //     req.session.loggedin = true;
    //     req.session.username = username;
        
    //     res.redirect('/topsecret');
    // }else {
    //     //kommentera ut vid fel sökning
    //     res.render('form', {title: 'Schoolsoft', msg: 'wrong username or password'});
    // }
});

module.exports = router;
