const express = require('express');
const { body } = require('express-validator');
const router = express.Router();

const AuthController = require('../controllers/AuthController');

/* GET users listing. */
router.get('/', AuthController.show);

/* post login */
router.post('/', 
    body('username').notEmpty().trim(),
    body('password').notEmpty(),
    AuthController.store
);

module.exports = router;
