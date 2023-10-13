const express = require('express');
const validators = require('../validations/authValidations');

const authController = require('../controllers/auth_controller');


const router = express.Router();



router.put('/signup',
    validators.emailValidation
    , authController.signup);

router.post('/signin',
    authController.signin
);
module.exports = router;

