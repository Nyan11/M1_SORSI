const connexion = require("../../db/sql");
const router = require('express').Router();
const jwtManager = require('../../jwt/jwtManager');

router.delete('/composantes', jwtManager.verifyToken, (req, res) => {

    if (!jwtManager.checkPermission(1, jwtManager.getJtw(req.headers['x-access-token']))) {
        res.status(403).json({
            error: true,
            message: "Vous n'avez pas accès à cette ressource"
        });
        return;
    }

    let id_composante = req.body.idComposante;
    if (!id_composante) {
        return res.status(400).json({
            error: true,
            message:  "Merci de spécifier l'id de la composante à supprimer"
        });
    }

    //Vérification que la composante ne sois pas lier à une filière
    const SQLRequest = "SELECT * FROM COMPOSANTE INNER JOIN FILIERE_LANGUE ON COMPOSANTE.idComposante = FILIERE_LANGUE.idComposante AND COMPOSANTE.idComposante = ?";
    connexion.query(SQLRequest,[id_composante],async (error, result) => {

        if(error) throw error;
        if (result.length > 0) {
            res.status(200).json({
                "error":true,
                "message":"Impossible de supprimer la composante car elle est lié a une filière langue !"
            });
        }
        else {

            //Suppression de la composante
            const SQLRequest = "DELETE FROM COMPOSANTE WHERE idComposante = ?";
            await connexion.query(SQLRequest, [id_composante], async (error, result) => {

                if (error) throw error;

                if (result.affectedRows > 0) {
                    res.status(200).json({
                        error: false,
                        message: "La composante à bien été supprimé !"
                    });
                    console.log("FUNCTION CALL : [DELETE] - Suppression d'une composante avec l'id " + id_composante);
                } else {
                    res.status(404).json({
                        error: true,
                        message: "Aucune composante avec cette id trouvé !"
                    });

                }
            });
        }
    });
});

module.exports = router;
