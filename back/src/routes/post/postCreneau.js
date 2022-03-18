const connexion = require("../../db/sql");
const router = require('express').Router();
const jwtManager = require('../../jwt/jwtManager');

router.post('/creneaux', jwtManager.verifyToken, function (req, res) {

    if (!jwtManager.checkPermission(3, jwtManager.getJtw(req.headers['x-access-token']))) {
        res.status(403).json({
            error: true,
            message: "Vous n'avez pas accès à cette ressource"
        });
        return;
    }

    const { idCours, date_heure, duree, type, salle} = req.body;

    let sql = "UPDATE CRENEAU SET idCours=?,date_heure=?,duree=?,type=?,salle=? WHERE idCreneau=? ";

    connexion.query(sql, [idCours, date_heure, duree, type, salle, idCreneau], function (err, data, fields) {

        if (err) res.status(500).json(err);
        if (data.affectedRows === 0) {
            res.status(304).json({status : "echec put Creneau",});
            return;
        }
        res.status(200).json({});


    });
});

module.exports = router;
