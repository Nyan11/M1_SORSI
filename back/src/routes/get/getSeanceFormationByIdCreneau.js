const connexion = require("../../db/sql");
const jwtManager = require("../../jwt/jwtManager");
const router = require('express').Router();

router.get('/getSeanceFormationByIdCreneau', jwtManager.verifyToken,(req, res) => {

    const { idCreneau } = req.query;

    const SQLRequest = "SELECT * FROM SEANCE_FORMATION " +
    "LEFT JOIN CRENEAU ON SEANCE_FORMATION.idCreneau = CRENEAU.idCreneau " +
    "LEFT JOIN INTERVENANT ON SEANCE_FORMATION.idIntervenant = INTERVENANT.idIntervenant " +
    "WHERE SEANCE_FORMATION.idCreneau = ?";
    connexion.query(SQLRequest, [idCreneau], function (err, data) {

        if (err) {
            res.status(500).json(err);
        }
        else if (data.length === 0) {
            res.status(204).json({});
        }
        else {
            res.status(200).json(data);
            console.log("FUNCTION CALL : [GET] - Liste des séance formation par id d'un créneau");
        }
    });
});

module.exports = router;
