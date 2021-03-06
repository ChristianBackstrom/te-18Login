const bcrypt = require('bcrypt');
const { query } = require('../models/db');
const { body, validationResult } = require('express-validator');

module.exports.show = async function(req, res, next) {
  if (req.session.loggedin) {
    return res.redirect('/home');
  }
  return res.render('register', { title: 'Loginsidan'});
};

module.exports.store = async function(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors.array());
      return res.status(400).render('register', { errors: errors.array() });
    }
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    bcrypt.hash(password, 10, async function (err, hash) {
      if (err) throw err;
      try {
        const sql = 'INSERT INTO users (name, email, password, created_at) VALUES (?, now())';
        const result = await query(sql, [username, email, hash]);

        if (result.insertId > 0) {
          res.render('form');
        }

      } catch (e) {
        next(e);
        console.error(e);
      }
    });
};