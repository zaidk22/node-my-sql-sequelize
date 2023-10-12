const express = require('express');
const { body } = require('express-validator');

const authController = require('../controllers/auth_controller');


const router = express.Router();


router.put('/signup', [
    body('email').isEmail()
        .withMessage('Please enter a valid email')

], authController.signup);

router.post('/signin',
authController.signin
);
module.exports = router;

