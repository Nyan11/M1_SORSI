const connexion = require("../../db/sql");
const router = require('express').Router();
const jwtManager = require('../../jwt/jwtManager');

router.delete('/gestionnaires', (req, res) => {

    if (!jwtManager.checkPermission(0, jwtManager.getJtw(req.headers['x-access-token']))) {
        res.status(403).json({
            error: true,
            message: "Vous n'avez pas accès à cette ressource"
        });
        return;
    }

    let login_gestionnaire = req.body.login;
    if (!login_gestionnaire) {
        return res.status(400).json({
            error: true,
            message:  "Merci de spécifier le login du gestionnaire à supprimer"
        });
    }

    const SQLRequest = "DELETE FROM GESTIONNAIRE WHERE login = ?";
    connexion.query(SQLRequest,[login_gestionnaire] , async (error , result) => {

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
        console.log("FUNCTION CALL : [DELETE] - Suppression du gestionnaire avec le login "+login_gestionnaire);
    });
});

module.exports = router;
