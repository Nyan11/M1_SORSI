const connexion = require("../../db/sql");
const router = require('express').Router();

router.post('/participe', function (req, res) {
    const idCours = req.body.idCours;
    const intervenants = req.body.intervenants;
    let error = false;

    let SQLRequest = "DELETE FROM PARTICIPE_A WHERE idCours = ?";
    connexion.query(SQLRequest,[idCours] , (error , result) => {
        if(error) throw error;
    });

    SQLRequest = "INSERT INTO PARTICIPE_A(idCours, idIntervenant) VALUES (?,?)";
    intervenants.forEach((id, i) => {
      connexion.query(SQLRequest, [idCours , id], function (err, data, fields) {
          if (err) return err
      });
    });
    res.status(200).json({});
});

module.exports = router;
