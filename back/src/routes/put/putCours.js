const connexion = require("../../db/sql");
const router = require('express').Router();

router.put('/cours', function (req, res) {

    const { intitule, idFiliereLangue, idIntervenant } = req.body;

    let sql = "INSERT INTO COURS(intitule) VALUES (?)";
    connexion.query(sql, [intitule], function (err, data, fields) {

        sql = "SELECT MAX(id) as 'id' FROM COURS";
        connexion.query(sql, function (err, data, fields) {

            let idCours  = data[0].id;
            console.log(idCours);
            console.log(idIntervenant);

            sql = "INSERT INTO CONCERNE(idCours, idFiliereLangue) VALUES (?,?)";
            connexion.query(sql, [idCours , idFiliereLangue],function (err, data, fields) {

                sql = "INSERT INTO PARTICIPE_A(idIntervenant, idCours) VALUES (?,?)";
                connexion.query(sql, [idIntervenant, idCours] , function (err, data, fields) {
                    if (err) return err
                    if (data.affectedRows === 0) {
                        res.status(304).json({status : "echec put cours",});
                        return;
                    }
                    res.status(200).json({});
                });

            });
        });



    });
});

module.exports = router;