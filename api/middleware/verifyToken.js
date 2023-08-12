const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const accessToken = req.headers["access_token"];

    if(!accessToken){
        res.status(404).json({message: "No token provided"});
    } else {
        jwt.verify(accessToken, process.env.AUTH_TOKEN, (err, decoded) => {
            if(err) res.status(500).json({error: err});
            else  {
                req.userId = decoded;
                next();
            }
        });
    }
};

module.exports = verifyToken;