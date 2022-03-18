const connexion = require("../../db/sql");
const router = require('express').Router();
const jwtManager = require('../../jwt/jwtManager');

router.delete('/filiereslangue', jwtManager.verifyToken, (req, res) => {

    if (!jwtManager.checkPermission(1, jwtManager.getJtw(req.headers['x-access-token']))) {
        res.status(403).json({
            error: true,
            message: "Vous n'avez pas accès à cette ressource"
        });
        return;
    }

    let id_filiere = req.body.id;
    if (!id_filiere) {
        return res.status(400).json({
            error: true,
            message:  "Merci de spécifier l'id de la filière langue à supprimer"
        });
    }

    //Vérification que la filière ne sois pas lier à un cours
    const SQLRequest = "SELECT * FROM FILIERE_LANGUE INNER JOIN CONCERNE ON FILIERE_LANGUE.idFiliereLangue = CONCERNE.idFiliereLangue WHERE FILIERE_LANGUE.idFiliereLangue = ?";
    connexion.query(SQLRequest,[id_filiere],async (error, result) => {

        if(error) throw error;
        if (result.length > 0) {
            res.status(200).json({
                "error":true,
                "message":"Impossible de supprimer la filière langue car elle est lié a un/des cours"
            });
        }
        else {

            //Suppression de la filière
            const SQLRequest = "DELETE FROM FILIERE_LANGUE WHERE idFiliereLangue = ?";
            await connexion.query(SQLRequest, [id_filiere], async (error, result) => {

                if (error) throw error;

                if (result.affectedRows > 0) {
                    res.status(200).json({
                        error: false,
                        message: "La filière à bien été supprimé !"
                    });
                    console.log("FUNCTION CALL : [DELETE] - Suppression de la filiere langue avec l'id " + id_filiere);
                } else {
                    res.status(404).json({
                        error: true,
                        message: "Aucune filière avec cet id trouvé !"
                    });
                }
            });
        }
    });
});

module.exports = router;
