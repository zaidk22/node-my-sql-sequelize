const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    // const authHeader = req.get('Authorization');
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        // const error = new Error('Not authenticated');
        // error.statusCode = 401;
        // throw error;
        res.status(401).json({message:"Not authenticated"});
    }
    const token = authHeader.split(' ')[1];
    let decodeToken;

    try {

        decodeToken = jwt.verify(token, 'secret-key',);
        console.log("toj ",decodeToken);

    }
    catch (err) {
        err.statusCode = 403;
        err.message = "Token expired";
        throw err;
    }

    if (!decodeToken) {
        const error = new Error('Not authenticated.');
        error.statusCode = 401;
        throw error;
    }

    req.userData= decodeToken;

    next();
}