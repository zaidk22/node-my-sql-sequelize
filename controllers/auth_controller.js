const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
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
        else{
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

  const isUserExist = await  models.User.findOne({where :{email:email}});
   if(!isUserExist){
    res.status(201).json({
        message: "User not found ",
        user: user
    });
   }
   // bcrypt.compare(password, req.password);
    // const token = jwt.sign({
    //     email: loadedUser.email,
    //     userId: loadedUser._id.toString()
    // }, 'secret-key', { expiresIn: '1h' });
   

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