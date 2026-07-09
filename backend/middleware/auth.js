const jwt = require('jsonwebtoken');

const SECRET_KEY = "eventhub_rahasia";

function verifyToken(req, res, next) {

    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({
            message: "Token ditemukan"
        });
    }

    const token = authHeader.split(" ") [1];

    jwt.verify(token, SECRET_KEY, (err, decoded) => {

        if (err) {
            return res.status(403).json ({
                message: "Token tidak valid"
            });
        }
        req.user = decoded;

        next();
    });

}

module.exports = verifyToken;