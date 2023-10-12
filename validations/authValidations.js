const { body } = require('express-validator');


const emailValidation = [
    body('email').isEmail().withMessage('Please enter a valid email'),
    // Add more validation checks as needed
];



module.exports = {
    emailValidation
}
