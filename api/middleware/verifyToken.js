const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if(authHeader){
        const token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.AUTH_TOKEN, (err, decoded) => {
            if(err) return res.status(403).json({message: "Token is not valid"});
            else {
                res.user = decoded;
                next();
            }
        });
    }else {
        return res.status(401).json({message: "You are not authenticated"});
    }
};

module.exports = verifyToken;