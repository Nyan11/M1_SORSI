const jwt = require('jsonwebtoken');
const jwtConfig = require('./jwtConfig');


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
        jwt.verify(token, jwtConfig.PRIVATE_KET);
        next();
    }
    catch (e) {
        return res.status(401).send("Token invalide !");
    }
};

exports.getJtw = function (token) {

    const decode = jwt.decode(token);
    console.log(decode);
    return decode;
}


exports.checkPermission = function (wantedPermission, token) {

    const tokenPermission = token.type;
    return tokenPermission <= wantedPermission;

}