const { query } = require('../models/db');
const { body, validationResult } = require('express-validator');

module.exports.show = async function(req, res, next) {
    if (req.session.loggedin) {
      return res.render('change');
    }
    return res.render('register', { title: 'Loginsidan'});
  };

module.exports.update = async function(req, res, next){
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors.array());
      return res.status(400).render('register', { errors: errors.array() });
    }

    const lastPassword = req.body.lastPassword;
    const newPassword = req.body.newPassword;
};