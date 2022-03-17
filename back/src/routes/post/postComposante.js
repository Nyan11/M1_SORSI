const connexion = require("../../db/sql");
const router = require('express').Router();

router.post('/composantes', function (req, res) {

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
