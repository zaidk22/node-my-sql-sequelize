const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const models = require('../models');
async function signup(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(403).json({
            message: "Validation failed",
            data: errors.array()
        });

    }
    const hashedPassword = await bcrypt.hash(req.body.password, 12);
    const user = {

        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    };



    try {
        const emailAvaialable = await models.User.findOne({ where: { email: user.email } });
        if (!emailAvaialable) {
            await models.User.create(user);
            res.status(201).json({
                message: "Account created",
                user: user
            });
        }
        else {
            res.status(401).json({
                message: "Email already in use",
                user: user
            });
        }

    }
    catch (e) {
        res.status(500).json(e);

    }



}

async function signin(req, res,) {

    const email = req.body.email;
    const password = req.body.password;

    const user = await models.User.findOne({ where: { email: email } });
    if (!user) {
        res.status(401).json({
            message: "User with this email not found ",

        });
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
        res.status(401).json({
            message: "Invalid password",

        });

    }
    const token = jwt.sign({
        email: user.email,
        userId: user.userId
    }, 'secret-key', { expiresIn: '1h' });
    res.status(200).json({
        message: "success",
        user: user,
        token: token


    });




}

// exports.login = (req, res, next) => {

//     const email = req.body.email;
//     const password = req.body.password;
//     let loadedUser;
//     User.findOne({ email: email })
//         .then(user => {
//             if (!user) {
//                 const error = new Error('User with this email could not be found.');
//                 err.statusCode = 401;
//                 throw error;
//             }
//             loadedUser = user;
//             console.log(user);
//             return bcrypt.compare(password, user.password);
//         })
//         .then(isEqual => {

//             if (!isEqual) {
//                 const error = new Error('Wrong password !');
//                 error.statusCode = 401;
//                 throw error;
//             }
//             const token = jwt.sign({
//                 email: loadedUser.email,
//                 userId: loadedUser._id.toString()
//             }, 'secret-key', { expiresIn: '1h' });
//             res.status(200).json({ token: token, userId: loadedUser._id.toString() });
//         })
//         .catch(err => {
//             console.log(err);
//             if (!err.statusCode) {
//                 err.statusCode = 500;

//             }
//             next(err);

//         });



//     };

module.exports = {
    signup,
    signin
}