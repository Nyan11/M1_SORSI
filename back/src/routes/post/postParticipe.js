const connexion = require("../../db/sql");
const router = require('express').Router();
const jwtManager = require('../../jwt/jwtManager');

router.post('/participe', jwtManager.verifyToken, function (req, res) {

    if (!jwtManager.checkPermission(1, jwtManager.getJtw(req.headers['x-access-token']))) {
        res.status(403).json({
            error: true,
            message: "Vous n'avez pas accès à cette ressource"
        });
        return;
    }

    const idCours = req.body.idCours;
    const intervenants = req.body.intervenants;
    let error = false;

    let SQLRequest = "DELETE FROM PARTICIPE_A WHERE idCours = ?";
    connexion.query(SQLRequest,[idCours] , (error , result) => {
      if (error) {
        res.status(500).json({err: error});
        return;
      }
    });

    SQLRequest = "INSERT INTO PARTICIPE_A(idCours, idIntervenant) VALUES (?,?)";
    intervenants.forEach((id, i) => {
      if (error) return;
      connexion.query(SQLRequest, [idCours , id], function (err, data, fields) {
          if (err) {
            error = true;
            res.status(501).json({err: err});
            return;
          }
      });
    });
    if (error) return;
    res.status(200).json({});
});

module.exports = router;
