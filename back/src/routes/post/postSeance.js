const connexion = require("../../db/sql");
const router = require('express').Router();

router.post('/seances', function (req, res) {

    const { idSeance,  estEffectue, dureeEffective, valide, commentaire} = req.body;

    let sql = "UPDATE SEANCE_FORMATION SET estEffectue = ?, dureeEffective = ?, valide = ?,commentaire = ? WHERE idSeanceFormation = ?";

    connexion.query(sql, [estEffectue, dureeEffective, valide, commentaire, idSeance], function (err, data, fields) {

        if (err) res.status(500).json(err);
        if (data.affectedRows === 0) {
            res.status(304).json({status : "echec post seance",});
            return;
        }
        res.status(200).json({});

    });
});

module.exports = router;