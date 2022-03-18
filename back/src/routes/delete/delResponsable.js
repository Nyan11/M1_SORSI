const connexion = require("../../db/sql");
const router = require('express').Router();
const jwtManager = require('../../jwt/jwtManager');

router.delete('/responsables', (req, res) => {

    if (!jwtManager.checkPermission(1, jwtManager.getJtw(req.headers['x-access-token']))) {
        res.status(403).json({
            error: true,
            message: "Vous n'avez pas accès à cette ressource"
        });
        return;
    }

    let login_responsable = req.body.login;
    if (!login_responsable) {
        return res.status(400).json({
            error: true,
            message:  "Merci de spécifier le login du responsable à supprimer"
        });
    }

    //Vérification que le responsable ne sois pas lier à une composante
    const SQLRequest = "SELECT * FROM RESPONSABLE INNER JOIN COMPOSANTE ON RESPONSABLE.idResponsable = COMPOSANTE.idResponsable AND RESPONSABLE.login = ?";
    connexion.query(SQLRequest,[login_responsable],async (error, result) => {

        if(error) throw error;
        if (result.length > 0) {
            res.status(200).json({
                "error":true,
                "message":"Impossible de supprimer le responsable car il est lié à une composante !"
            });
        }
        else {

            //Suppression du responsable
            const SQLRequest = "DELETE FROM RESPONSABLE WHERE login = ?";
            await connexion.query(SQLRequest, [login_responsable], async (error, result) => {

                if (error) throw error;

                if (result.affectedRows > 0) {
                    res.status(200).json({
                        error: false,
                        message: "Le responsable à bien été supprimé !"
                    });
                    console.log("FUNCTION CALL : [DELETE] - Suppression du responsable avec le login " + login_responsable);
                } else {
                    res.status(404).json({
                        error: true,
                        message: "Aucun responable avec ce login trouvé !"
                    });

                }
            });
        }
    });
});

module.exports = router;
