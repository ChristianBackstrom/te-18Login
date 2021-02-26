const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const accountcontroller = require('../controllers/AccountController');

/* GET login form */
router.get('/', accountcontroller.show);

router.post('/',
    body('lastPassword').notEmpty(),
    body('newPassword').notEmpty(),
    body('confirmPassword').custom((value, { req }) => {
      if (value !== req.body.newPassword) {
        throw new Error('Password confirmation does not match password');
      }
      // Indicates the success of this synchronous custom validator
      return true;
    }),
    accountcontroller.store
);