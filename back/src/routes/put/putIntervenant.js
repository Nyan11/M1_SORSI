const connexion = require("../../db/sql");
const router = require('express').Router();

router.put('/intervenants', function (req, res) {

    const { login, nom, prenom, mail, mot_de_passe } = req.body;

    let sql = "INSERT INTO INTERVENANT (login, motDePasse, nomUsuel, prenom, mail) VALUES (?,?,?,?,?) ";

    connexion.query(sql, [login , mot_de_passe , nom , prenom , mail], function (err, data, fields) {

        if (err) return err
        if (data.affectedRows === 0) {
            res.status(304).json({status : "echec put intervenants",});
            return;
        }
        res.status(200).json({});


    });
});

module.exports = router;