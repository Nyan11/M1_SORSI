const connexion = require("../../db/sql");
const router = require('express').Router();

router.delete('/responsables', (req, res) => {

    let login_gestionnaire = req.body.login;
    if (!login_gestionnaire) {
        return res.status(400).json({
            error: true,
            message:  "Merci de spécifier le login du responsable à supprimer"
        });
    }

    let SQLRequest = "DELETE FROM RESPONSABLE WHERE login = ?";
    connexion.query(SQLRequest,[login_gestionnaire] , (error , result) => {

        if(error) throw error;

        if (result.affectedRows > 0) {
            res.status(200).json({
                error: false,
                message: "Le responsable à bien été supprimé !"
            });
        }
        else {
            res.status(404).json({
                error: true,
                message: "Aucun responsable avec ce login trouvé !"
            });

        }
        console.log("FUNCTION CALL : [DELETE] - Suppression du responsable avec le login "+login_gestionnaire);
    });
});

module.exports = router;
