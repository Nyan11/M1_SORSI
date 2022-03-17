const connexion = require("../../db/sql");
const router = require('express').Router();

router.put('/seances', function (req, res) {

    const { idIntervenant, idCreneau} = req.body;

    let sql = "INSERT INTO SEANCE_FORMATION(idIntervenant, idCreneau, estEffectue, dureeEffective, valide, commentaire) VALUES (?, ?, ?, ?, ?, ?)";

    connexion.query(sql, [idIntervenant, idCreneau, 0, null, 0, null ], function (err, data, fields) {

        if (err) res.status(500).json(err);
        if (data.affectedRows === 0) {
            res.status(304).json({status : "echec put Seance",});
            return;
        }
        res.status(200).json({});


    });
});

module.exports = router;