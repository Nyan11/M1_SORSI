const connexion = require("../../db/sql");
const router = require('express').Router();

router.delete('/cours', (req, res) => {

    let id_cours = req.body.id;
    if (!id_cours) {
        return res.status(400).json({
            error: true,
            message:  "Merci de spécifier l'id du cours à supprimer"
        });
    }

    let SQLRequest = "DELETE FROM COURS WHERE id = ?";
    connexion.query(SQLRequest,[id_cours] , (error , result) => {

        if(error) throw error;

        if (result.affectedRows > 0) {
            res.status(200).json({
                error: false,
                message: "Cours supprimé avec succès"
            });
        }
        else {
            res.status(404).json({
                error: true,
                message: "Aucun cours avec cette id trouvé !"
            });

        }
        console.log("FUNCTION CALL : [DELETE] - Suppression d'un cours");
    });
});

module.exports = router;