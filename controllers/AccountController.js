const bcrypt = require('bcrypt');
const { query } = require('../models/db');
const { body, validationResult } = require('express-validator');

module.exports.show = async function(req, res, next) {
    if (req.session.loggedin) {
      return res.render('change');
    }
    return res.render('form');
  };

module.exports.update = async function(req, res, next){
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors.array());
      return res.status(400).render('change', { errors: errors.array() });
    }

    if (req.session.loggedin === true){
      
      const lastPassword = req.body.lastPassword;
      const newPassword = req.body.newPassword;
      const DBPassword = "";
      
      try{
        const sql = 'SELECT password FROM users WHERE name = ?';
        const result = await query(sql, req.session.username);
        // Load hash from your password DB.
        if(result.length > 0){
          bcrypt.compare(lastPassword, result[0].password, function(err, result) {
            if (result == true){
              bcrypt.hash(newPassword, 10, function(err, hash) {
                DBPassword = hash;
              });
              sql = "'UPDATE users SET password = ? WHERE `name` = ? AND `password` = ?";
              result = query(sql, DBPassword, req.session.username, result[0].password);
              console.log(sql + DBPassword + req.session.username, result[0].password);
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