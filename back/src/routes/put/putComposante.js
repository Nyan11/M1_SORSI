const connexion = require("../../db/sql");
const router = require('express').Router();

router.put('/composantes', function (req, res) {

    const { nomComposante, idGestionnaire} = req.body;

    let sql = "INSERT INTO COMPOSANTE(nomComposante, idGestionnaire) VALUES (?,?)";

    connexion.query(sql, [nomComposante , idGestionnaire], function (err, data, fields) {

        if (err) return err
        if (data.affectedRows === 0) {
            res.status(304).json({status : "echec put Composantes",});
            return;
        }
        res.status(200).json({});


    });
});

module.exports = router;
