const connexion = require("../../db/sql");
const router = require('express').Router();

router.post('/gestionnaires', function (req, res) {

    const { login, nom, prenom, mail, mot_de_passe } = req.body;

    let sql = "UPDATE GESTIONNAIRE SET motDePasse=?,nomUsuel=?,prenom=?,mail=? WHERE login=? ";

    connexion.query(sql, [mot_de_passe ,nom , prenom , mail, login], function (err, data, fields) {

        if (err) return err
        if (data.affectedRows === 0) {
            res.status(304).json({status : "echec post gestionnaire",});
            return;
        }
        res.status(200).json({});

    });
});

module.exports = router;