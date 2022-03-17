const connexion = require("../../db/sql");
const router = require('express').Router();

router.put('/cours', function (req, res) {

    const { intitule } = req.body;

    let sql = "INSERT INTO COURS(intitule) VALUES (?)";
    connexion.query(sql, [intitule], function (err, data, fields) {
        sql = "SELECT MAX(id) as 'id' FROM COURS";
        connexion.query(sql, function (err, data, fields) {
            let idCours  = data[0].id;
            res.status(200).json({id: idCours});
          });
    });
});

module.exports = router;
