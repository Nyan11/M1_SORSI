const connexion = require("../../db/sql");
const router = require('express').Router();
const jwtManager = require('../../jwt/jwtManager');

router.post('/composantes', jwtManager.verifyToken, function (req, res) {

    if (!jwtManager.checkPermission(1, jwtManager.getJtw(req.headers['x-access-token']))) {
        res.status(403).json({
            error: true,
            message: "Vous n'avez pas accès à cette ressource"
        });
        return;
    }

    const { idResponsable, nomComposante, idComposante } = req.body;

    let sql = "UPDATE COMPOSANTE SET idResponsable=?,nomComposante=? WHERE idComposante=?";

    connexion.query(sql, [idResponsable, nomComposante, idComposante], function (err, data, fields) {

        if (err) return err
        if (data.affectedRows === 0) {
            res.status(304).json({status : "echec post Composantes",});
            return;
        }
        res.status(200).json({});

    });
});

module.exports = router;
