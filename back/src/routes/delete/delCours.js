const connexion = require("../../db/sql");
const router = require('express').Router();

router.delete('/cours', (req, res) => {

    let id_cours = req.body.idCours;
    console.log(req.body)
    if (!id_cours) {
        res.status(400).json({
            error: true,
            message:  "Merci de spécifier l'id du cours à supprimer"
        });
        return;
    }

    const SQLRequest = "DELETE FROM COURS WHERE idCours = ?";
    connexion.query(SQLRequest,[id_cours] , (error , result) => {

        if(error) {
          res.status(500).json({
              error: true,
              message: error,
          });
        }

        if (result.affectedRows === 0) {
            res.status(200).json({
                error: false,
                message: "Cours supprimé avec succès"
            });
            return;
        }
        else {
            res.status(404).json({
                error: true,
                message: "Aucun cours avec cette id trouvé !"
            });
            return;
        }
        console.log("FUNCTION CALL : [DELETE] - Suppression d'un cours");
    });
});

module.exports = router;
