const connexion = require("../../db/sql");
const jwt = require('jsonwebtoken');
const jwtManager = require('../../jwt/jwtManager');

const router = require('express').Router();

router.delete('/intervenants', jwtManager.verifyToken, (req, res) => {

    if (!jwtManager.checkPermission(1, jwtManager.getJtw(req.headers['x-access-token']))) {
        res.status(403).json({
            error: true,
            message: "Vous n'avez pas accès à cette ressource"
        });
        return;
    }

    let login_intervenant = req.body.login;
    if (!login_intervenant) {
        return res.status(400).json({
           error: true,
           message:  "Merci de spécifier le login de l'intervenant à supprimer"
        });
    }

    //Vérification que l'intervenant ne sois pas lier à un cours
    const SQLRequest = "SELECT * FROM INTERVENANT INNER JOIN PARTICIPE_A ON INTERVENANT.idIntervenant = PARTICIPE_A.idIntervenant AND INTERVENANT.login = ?";
    connexion.query(SQLRequest,[login_intervenant],async (error, result) => {

        if(error) throw error;
        if (result.length > 0) {
            res.status(200).json({
               "error":true,
                "message":"Impossible de supprimer l'intervenant car il est lié a un/des cours !"
            });
        }
        else {

            //Suppression de l'intervenant
            const SQLRequest = "DELETE FROM INTERVENANT WHERE login = ?";
            await connexion.query(SQLRequest, [login_intervenant], async (error, result) => {

                if (error) throw error;

                if (result.affectedRows > 0) {
                    res.status(200).json({
                        error: false,
                        message: "L'invervenant à bien été supprimé !"
                    });
                    console.log("FUNCTION CALL : [DELETE] - Suppression de l'intervant avec le login " + login_intervenant);
                } else {
                    res.status(404).json({
                        error: true,
                        message: "Aucun intervenant avec ce login trouvé !"
                    });

                }
            });
        }
    });
});

module.exports = router;
