const connexion = require("../../db/sql");
const router = require('express').Router();

router.get('/getTotalHeuresIntervenants', (req, res) => {

    const { idIntervenant } = req.query;

    let sql = "SELECT SUM(dureeEffective) as totalHeures FROM SEANCE_FORMATION WHERE idIntervenant = ?";
    connexion.query(sql, [idIntervenant], function (err, data) {

        if (err) {
            res.status(500).json(err);
        }
        else if (data.length === 0) {
            res.status(204).json({});
        }
        else {
            var total = data[0].totalHeures/10000;
            res.status(200).json({heure : total.toString().replace('.','h')});
            console.log("FUNCTION CALL : [GET] - calcul total des heures intervenant");
        }
    });
});

module.exports = router;