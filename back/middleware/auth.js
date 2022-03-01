const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

module.exports = (req, res, next) => {
try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.SECRET);
    const userId = decodedToken.userId;
    req.auth = { userId };
    if (req.body.userId && (req.body.userId !== userId)) {
    throw 'Invalid user ID';
    } else {
    next();
    }
    // const userIdParams = req.originalUrl.split("=")[1];

    // if(req._body === true) {
    //     if(req.body.userId === decodedToken) {
    //         next();
    //     } else {
    //         throw 'Invalid user ID';
    //     }
    // } else if (userIdParams === decodedToken){
    //         next();
    // } else {
    //     throw 'Error authentication';
    // }

} catch {
    res.status(401).json({
    error: new Error('Invalid request!')
    });
}
};