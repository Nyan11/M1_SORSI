const connexion = require("../../db/sql");
const router = require('express').Router();
const jwtManager = require('../../jwt/jwtManager');
const e = require("express");

router.post('/login',(req, res) => {

    const login = req.body.login;
    const password = req.body.password;
    const type = req.body.type;

    if (!login) {
        res.status(400).json({
            error: true,
            message: "Merci de spécifier un login"
        });
        return;
    }
    if (!password) {
        res.status(400).json({
            error: true,
            message: "Merci de spécifier un mot de passe"
        });
        return;
    }

    let userType;
    if (type === 0) userType = "ADMINISTRATEUR";
    else if (type === 1) userType = "GESTIONNAIRE";
    else if (type === 2) userType = "RESPONSABLE";
    else if (type === 3) userType = "INTERVENANT";
    else {
        res.status(400).json({
            error: true,
            message: "Le type d'utilisateur n'est pas correct"
        })
    }

    const request = "SELECT * FROM "+ userType +" WHERE login=? AND motDePasse=?";

    connexion.query(request,[login,password], async function (error, result) {

        if (error) throw error;
        else {
            if (result.length === 0) {
                res.status(404).json({
                    error: true,
                    message: "Identifiant ou mot de passe inconnu"
                })
            }
            else {

                const userID = "id"+userType.charAt(0).toUpperCase()+userType.substring(1).toLowerCase();
                const jwt = jwtManager.createJwt(result[0][userID], login, password, type);

                res.status(200).json({
                    "id":result[0][userID],
                    "type":type,
                    "jwt":jwt
                });
            }
        }
    });

    console.log("FUNCTION CALL : [GET] - Login: '"+login+"'   type: "+userType);
});

module.exports = router;