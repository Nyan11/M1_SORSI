const connexion = require("../../db/sql");
const router = require('express').Router();
const jwtManager = require('../../jwt/jwtManager');

router.put('/seances', function (req, res) {

    if (!jwtManager.checkPermission(3, jwtManager.getJtw(req.headers['x-access-token']))) {
        res.status(403).json({
            error: true,
            message: "Vous n'avez pas accès à cette ressource"
        });
        return;
    }

    const { idIntervenant, idCreneau} = req.body;

    let sql = "INSERT INTO SEANCE_FORMATION(idIntervenant, idCreneau, estEffectue, dureeEffective, valide, commentaire) VALUES (?, ?, ?, ?, ?, ?)";

    connexion.query(sql, [idIntervenant, idCreneau, 0, 0, 0, '' ], function (err, data, fields) {

        if (err) res.status(500).json(err);
        if (data.affectedRows === 0) {
            res.status(304).json({status : "echec put Seance",});
            return;
        }
        res.status(200).json({});


    });
});

module.exports = router;
