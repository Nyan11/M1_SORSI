const jwt = require('jsonwebtoken');
const jwtConfig = require('./tokenConfig');


exports.createJwt = function (login, password, type) {

    return jwt.sign(
        {login, password, type},
        jwtConfig.PRIVATE_KET,
        {
            expiresIn: "1h",
        }
    );
};

exports.verifyToken = function (req, res, next) {

    const token = req.headers['x-access-token'];
    if (!token) {
        return res.status(403).send("Un token est nécéssaire pour l'authentification");
    }

    try {
        req.user = jwt.verify(token, jwtConfig.PRIVATE_KET);
    }
    catch (e) {
        return res.status(401).send("Token invalide !");
    }


};