const connexion = require("../../db/sql");
const router = require('express').Router();

router.delete('/intervenants', (req, res) => {

    let login_intervenant = req.body.login;
    if (!login_intervenant) {
        return res.status(400).json({
           error: true,
           message:  "Merci de spécifier le login de l'intervenant à supprimer"
        });
    }

    let SQLRequest = "DELETE FROM INTERVENANT WHERE login = ?";
    connexion.query(SQLRequest,[login_intervenant] , (error , result) => {

        if(error) throw error;

        if (result.affectedRows > 0) {
            res.status(200).json({
                error: false,
                message: "L'invervenant à bien été supprimé !"
            });
        }
        else {
            res.status(404).json({
                error: true,
                message: "Aucun intervenant avec ce login trouvé !"
            });

        }
        console.log("FUNCTION CALL : [DELETE] - Suppression de l'intervant avec le login "+login_intervenant);
    });
});

module.exports = router;
