const connexion = require("../../db/sql");
const router = require('express').Router();

router.delete('/filiereslangue', (req, res) => {

    let id_filiere = req.body.id;
    if (!id_filiere) {
        return res.status(400).json({
            error: true,
            message:  "Merci de spécifier le login du gestionnaire à supprimer"
        });
    }


    //TODO VOIR CE QU'IL Y A SUPPRIMER POUR UN COURS
    let SQLRequest = "DELETE FROM GESTIONNAIRE WHERE login = ?";
    connexion.query(SQLRequest,[id_filiere] , (error , result) => {

        if(error) throw error;

        if (result.affectedRows > 0) {
            res.status(200).json({
                error: false,
                message: "Le gestionnaire à bien été supprimé !"
            });
        }
        else {
            res.status(404).json({
                error: true,
                message: "Aucun gestionnaire avec ce login trouvé !"
            });

        }
        console.log("FUNCTION CALL : [DELETE] - Suppression du gestionnaire avec le login "+id_filiere);
    });
});

module.exports = router;
