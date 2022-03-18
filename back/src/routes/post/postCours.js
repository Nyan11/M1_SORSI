const connexion = require("../../db/sql");
const router = require('express').Router();
const jwtManager = require('../../jwt/jwtManager');

router.post('/cours', jwtManager.verifyToken, function (req, res) {

    if (!jwtManager.checkPermission(2, jwtManager.getJtw(req.headers['x-access-token']))) {
        res.status(403).json({
            error: true,
            message: "Vous n'avez pas accès à cette ressource"
        });
        return;
    }

    const { idCours, intitule } = req.body;

    let sql = "UPDATE COURS SET intitule=? WHERE idCours = ?";

    connexion.query(sql, [intitule, idCours], function (err, data, fields) {

        if (err) {
          res.status(500).json({err: err});
          return;
        }
        if (data.affectedRows === 0) {
            res.status(304).json({status : "echec post cours",});
            return;
        }
        res.status(200).json({});
    });
});

module.exports = router;
