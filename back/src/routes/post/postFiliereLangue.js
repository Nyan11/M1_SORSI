const connexion = require("../../db/sql");
const router = require('express').Router();

router.post('/filiereslangue', function (req, res) {

    const { codeFiliereLangue, idComposante, nomFiliereLangue, idFiliereLangue } = req.body;

    let sql = "UPDATE FILIERE_LANGUE SET codeFiliereLangue=?,idComposante=?,nomFiliereLangue=? WHERE idFiliereLangue=?";

    connexion.query(sql, [codeFiliereLangue, idComposante, nomFiliereLangue, idFiliereLangue], function (err, data, fields) {

        if (err) return err
        if (data.affectedRows === 0) {
            res.status(304).json({status : "echec post Filiere langue",});
            return;
        }
        res.status(200).json({});

    });
});

module.exports = router;
