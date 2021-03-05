const bcrypt = require('bcrypt');
const { query } = require('../models/db');
const { body, validationResult } = require('express-validator');

module.exports.show = async function(req, res, next) {
    if (req.session.loggedin) {
      return res.render('change');
    }
    return res.redirect('/login');
  };

module.exports.update = async function(req, res, next){
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log("error");
      console.log(errors.array());
      return res.status(400).render('change', { errors: errors.array() });
    }
    console.log("sessionBefore")
    if (req.session.loggedin){
      console.log("session");
      
      const lastPassword = req.body.lastPassword;
      const newPassword = req.body.newPassword;
      
      try{
        const sql = 'SELECT password FROM users WHERE name = ?';
        const result = await query(sql, req.session.username);
        const oldPassword = result[0].password;
        // Load hash from your password DB.
        if(result.length > 0){
          console.table(result);
          bcrypt.compare(lastPassword, result[0].password, function(err, result) {
            if (result == true){
              bcrypt.hash(newPassword, 10, async function(err, hash) {
              

                const sql2 = "UPDATE users SET password = ? WHERE password = ?";
                result = await query(sql2, [hash, oldPassword]);
                console.table(result);
                
                return res.redirect('/home');
              });
            } else {
              res.render('change', {
                error: 'password is invalid',
                msg: ''
              });
            }
          });
        } else {
          res.render('change', {error: 'password is invalid', msg: ''});
        }
      } catch (e) {
        next(e);
        console.error(e);
      }
    }
  };