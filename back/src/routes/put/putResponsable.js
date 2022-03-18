const connexion = require("../../db/sql");
const router = require('express').Router();
const jwtManager = require('../../jwt/jwtManager');

router.put('/responsables', function (req, res) {

    if (!jwtManager.checkPermission(1, jwtManager.getJtw(req.headers['x-access-token']))) {
        res.status(403).json({
            error: true,
            message: "Vous n'avez pas accès à cette ressource"
        });
        return;
    }

    const { login, nom, prenom, mail, mot_de_passe } = req.body;

    let sql = "INSERT INTO RESPONSABLE (login, motDePasse, nomUsuel, prenom, mail) VALUES (?,?,?,?,?) ";

    connexion.query(sql, [login , mot_de_passe , nom , prenom , mail], function (err, data, fields) {

        if (err) return err
        if (data.affectedRows === 0) {
            res.status(304).json({status : "echec put responsable",});
            return;
        }
        res.status(200).json({});


    });
});

module.exports = router;
