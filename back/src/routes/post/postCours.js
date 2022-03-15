const connexion = require("../../db/sql");
const router = require('express').Router();

router.post('/cours', function (req, res) {

    const { id, intitule } = req.body;

    let sql = "UPDATE COURS SET intitule=? WHERE id = ?";

    connexion.query(sql, [intitule, id], function (err, data, fields) {

        if (err) return err
        if (data.affectedRows === 0) {
            res.status(304).json({status : "echec post cours",});
            return;
        }
        res.status(200).json({});

    });
});

module.exports = router;