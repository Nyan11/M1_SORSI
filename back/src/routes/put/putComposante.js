const connexion = require("../../db/sql");
const router = require('express').Router();
const jwtManager = require('../../jwt/jwtManager');

router.put('/composantes', function (req, res) {

    if (!jwtManager.checkPermission(1, jwtManager.getJtw(req.headers['x-access-token']))) {
        res.status(403).json({
            error: true,
            message: "Vous n'avez pas accès à cette ressource"
        });
        return;
    }

    const nomComposante = req.body.nomComposante;
    const idResponsable = req.body.idResponsable;

    const sql = "INSERT INTO COMPOSANTE(nomComposante, idResponsable) VALUES (?,?)";

    connexion.query(sql, [nomComposante , idResponsable], function (err, data, fields) {
        if (err) {
          res.status(500).json({err: err});
          return;
        }
        if (data.affectedRows === 0) {
            res.status(304).json({status : "echec put Composantes"});
            return;
        }
        res.status(200).json({});
    });
});

module.exports = router;
