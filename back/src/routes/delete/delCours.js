const connexion = require("../../db/sql");
const router = require('express').Router();
const jwtManager = require('../../jwt/jwtManager');

router.delete('/cours', (req, res) => {

    if (!jwtManager.checkPermission(1, jwtManager.getJtw(req.headers['x-access-token']))) {
        res.status(403).json({
            error: true,
            message: "Vous n'avez pas accès à cette ressource"
        });
        return;
    }

    let id_cours = req.body.idCours;
    if (!id_cours) {
        return res.status(400).json({
            error: true,
            message:  "Merci de spécifier l'id du cours à supprimer"
        });
    }

    //Vérification que le cours ne sois pas lier à des créneaux
    const SQLRequest = "SELECT * FROM COURS INNER JOIN CRENEAU ON COURS.idCours = CRENEAU.idCours WHERE COURS.idCours = ?";
    connexion.query(SQLRequest,[id_cours],async (error, result) => {

        if(error) {
          res.status(500).json({err: error});
        }
        if (result.length > 0) {
            res.status(200).json({
                "error":true,
                "message":"Impossible de supprimer le cours car il est lié à des créneaux"
            });
        }
        else {

            //Suppression du cours
            const SQLRequest = "DELETE FROM COURS WHERE idCours = ?";
            await connexion.query(SQLRequest, [id_cours], async (error, result) => {

              if(error) {
                res.status(500).json({err: error});
              }

                if (result.affectedRows > 0) {
                    res.status(200).json({
                        error: false,
                        message: "Le cours à bien été supprimé !"
                    });
                    console.log("FUNCTION CALL : [DELETE] - Suppression du cours avec l'id " + id_cours);
                } else {
                    res.status(404).json({
                        error: true,
                        message: "Aucun cours avec cet id trouvé !"
                    });
                }
            });
        }
    });
});

module.exports = router;
