const connexion = require("../../db/sql");
const router = require('express').Router();

router.post('/concerne', function (req, res) {
    const idCours = req.body.idCours;
    const filieres = req.body.filieres;
    let error = false;

    let SQLRequest = "DELETE FROM CONCERNE WHERE idCours = ?";
    connexion.query(SQLRequest,[idCours] , (error , result) => {
      if (error) {
        res.status(500).json({err: error});
        return;
      }
    });

    SQLRequest = "INSERT INTO CONCERNE(idCours, idFiliereLangue) VALUES (?,?)";
    filieres.forEach((id, i) => {
      if (error) return;
      connexion.query(SQLRequest, [idCours , id], function (err, data, fields) {
        if (err) {
          res.status(500).json({err: err});
          error = true;
          return;
        }
      });
    });
    if (error) return;
    res.status(200).json({});
    return;
});

module.exports = router;
