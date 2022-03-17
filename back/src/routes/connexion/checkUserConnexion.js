const connexion = require("../../db/sql");
const router = require('express').Router();

router.post('/login', (req, res) => {

    const GetUserType = require('../connexion/test');

    let login = req.body.login;
    let password = req.body.password;

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


    const request1 = "SELECT * FROM ADMINISTRATEUR WHERE login=? AND motDePasse=?";
    const request2 = "SELECT * FROM GESTIONNAIRE login=? AND motDePasse=?";
    const request3 = "SELECT * FROM INTERVENANT login=? AND motDePasse=?";

    connexion.query(request1,[login, password],function (error, result) {

        if (error) throw error;
        if (result.length > 0) setOutPut(0);
        else {

            connexion.query(request2,[login, password],function (error1, result1) {

                if (error1) throw error;
                if (result1.length > 0) setOutPut(1);
                else setOutPut(-1);

            });
        }
    });


    const setOutPut = (output) => {
        if (output === -1) {
            res.status(200).json({
                error: true,
                message: "Identifiant ou mot de passe inconnu !"
            });
        } else if (output === 0) {
            res.status(200).json({
                error: false,
                userType: 0
            });
        } else if (output === 1) {
            res.status(200).json({
                error: false,
                userType: 1
            });
        } else if (output === 2) {
            res.status(200).json({
                error: false,
                userType: 2
            });
        }
    }
});

module.exports = router;