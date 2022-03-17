const connexion = require("../../db/sql");
const router = require('express').Router();

router.put('/creneaux', function (req, res) {

    const { idCours, date_heure, duree, type, salle} = req.body;

    let sql = "INSERT INTO CRENEAU(idCours, date_heure, duree, type, salle) VALUES (?, ?, ?, ?, ?)";

    connexion.query(sql, [idCours, date_heure, duree, type, salle], function (err, data, fields) {

        if (err) res.status(500).json(err);
        if (data.affectedRows === 0) {
            res.status(304).json({status : "echec put Creneau",});
            return;
        }
        res.status(200).json({});


    });
});

module.exports = router;