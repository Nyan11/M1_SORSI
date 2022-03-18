const connexion = require("../../db/sql");
const router = require('express').Router();
const jwtManager = require('../../jwt/jwtManager');

router.put('/cours', function (req, res) {

    const { intitule } = req.body;
    console.log(intitule)

    let sql = "INSERT INTO COURS(intitule) VALUES (?)";
    connexion.query(sql, [intitule], function (err, data, fields) {
        if (err) {
          res.status(500).json({err: err});
          return;
        }
        sql = "SELECT MAX(idCours) as 'idCours' FROM COURS";
        connexion.query(sql, function (err, data, fields) {
            if (err) {
              res.status(500).json({err: err});
              return;
            }
            console.log(data)
            let idCours  = data[0].idCours;
            res.status(200).json({idCours: idCours});
          });
    });
});

module.exports = router;
