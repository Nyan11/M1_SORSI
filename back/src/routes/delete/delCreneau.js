const connexion = require("../../db/sql");
const router = require('express').Router();
const jwtManager = require('../../jwt/jwtManager');

router.delete('/creneaux', jwtManager.verifyToken, (req, res) => {

    if (!jwtManager.checkPermission(1, jwtManager.getJtw(req.headers['x-access-token']))) {
        res.status(403).json({
            error: true,
            message: "Vous n'avez pas accès à cette ressource"
        });
        return;
    }

    let id_creneau = req.body.idCreneau;
    if (!id_creneau) {
        return res.status(400).json({
            error: true,
            message:  "Merci de spécifier l'id du créneau à supprimer"
        });
    }

    //Vérification que le créneau ne sois pas lier à des séances de formation
    const SQLRequest = "SELECT * FROM CRENEAU INNER JOIN SEANCE_FORMATION ON CRENEAU.idCreneau = SEANCE_FORMATION.idCreneau WHERE CRENEAU.idCreneau = ?";
    connexion.query(SQLRequest,[id_creneau],async (error, result) => {

        if(error) {
            res.status(500).json({err: error});
        }
        if (result.length > 0) {
            res.status(200).json({
                "error":true,
                "message":"Impossible de supprimer le créneau car il est lié à des séances formation"
            });
        }
        else {

            //Suppression du créneau
            const SQLRequest = "DELETE FROM CRENEAU WHERE idCreneau = ?";
            await connexion.query(SQLRequest, [id_creneau], async (error, result) => {

                if(error) {
                    res.status(500).json({err: error});
                }

                if (result.affectedRows > 0) {
                    res.status(200).json({
                        error: false,
                        message: "Le créneau à bien été supprimé !"
                    });
                    console.log("FUNCTION CALL : [DELETE] - Suppression du créneau avec l'id " + id_creneau);
                } else {
                    res.status(404).json({
                        error: true,
                        message: "Aucun créneau avec cet id trouvé !"
                    });
                }
            });
        }
    });
});

module.exports = router;
