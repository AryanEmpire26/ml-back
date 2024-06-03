const express = require('express');
const passport = require('passport');
const { register, login } = require('../controllers/authController');

const router = express.Router();

// Manual Sign Up and Sign In
router.post('/register', register);
router.post('/login', login);



module.exports = router;
