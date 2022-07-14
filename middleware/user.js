const jwt = require('jsonwebtoken');

module.exports = {
    isLoggedIn: (req, res, next) => {
        if(!req.headers.authorization) {
            return res.status(400).send({
                message: 'your token is not valid!'
            })
        }
        try {
            const authHeader = req.headers.authorization;
            const token = authHeader.split(' ')[1];
            const decoded = jwt.verify(token, 'SECRETKEY');
            req.userData = decoded;
            next();
        } catch (err) {
            if(err.message==='jwt expired'){
                return res.status(401).send({
                    message: 'Token expired!'
                })
            }
            throw err;
            return res.status(400).send({
                message: 'your token is not valid!'
            })
        }
    }
}