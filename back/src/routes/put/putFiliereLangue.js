const connexion = require("../../db/sql");
const router = require('express').Router();
const jwtManager = require('../../jwt/jwtManager');

router.put('/filiereslangue', jwtManager.verifyToken, function (req, res) {

    if (!jwtManager.checkPermission(1, jwtManager.getJtw(req.headers['x-access-token']))) {
        res.status(403).json({
            error: true,
            message: "Vous n'avez pas accès à cette ressource"
        });
        return;
    }

    const { codeFiliereLangue, idComposante, nomFiliereLangue} = req.body;

    let sql = "INSERT INTO FILIERE_LANGUE(codeFiliereLangue, idComposante, nomFiliereLangue) VALUES (?,?,?)";

    connexion.query(sql, [codeFiliereLangue , idComposante , nomFiliereLangue], function (err, data, fields) {

        if (err) return err
        if (data.affectedRows === 0) {
            res.status(304).json({status : "echec put Filiere langue",});
            return;
        }
        res.status(200).json({});


    });
});

module.exports = router;
