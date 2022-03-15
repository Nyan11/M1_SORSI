const connexion = require("../../db/sql");
const router = require('express').Router();

router.post('/composantes', function (req, res) {

    const { idGestionnaire, nomComposante, idComposante } = req.body;

    let sql = "UPDATE COMPOSANTE SET idGestionnaire=?,nomComposante=? WHERE idComposante=?";

    connexion.query(sql, [idGestionnaire, nomComposante, idComposante], function (err, data, fields) {

        if (err) return err
        if (data.affectedRows === 0) {
            res.status(304).json({status : "echec post Composantes",});
            return;
        }
        res.status(200).json({});

    });
});

module.exports = router;