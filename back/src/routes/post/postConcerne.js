const connexion = require("../../db/sql");
const router = require('express').Router();

router.post('/concerne', function (req, res) {
    const idCours = req.body.idCours;
    const filieres = req.body.filieres;
    let error = false;

    let SQLRequest = "DELETE FROM CONCERNE WHERE idCours = ?";
    connexion.query(SQLRequest,[idCours] , (error , result) => {
        if(error) throw error;
    });

    SQLRequest = "INSERT INTO CONCERNE(idCours, idFiliereLangue) VALUES (?,?)";
    filieres.forEach((id, i) => {
      connexion.query(SQLRequest, [idCours , id], function (err, data, fields) {
          if (err) return err
      });
    });
    res.status(200).json({});
});

module.exports = router;
