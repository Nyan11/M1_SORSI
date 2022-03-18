const connexion = require("../../db/sql");
const router = require('express').Router();
const jwtManager = require('../../jwt/jwtManager');

router.get('/cours', (req, res) => {

    if (!jwtManager.checkPermission(3, jwtManager.getJtw(req.headers['x-access-token']))) {
        res.status(403).json({
            error: true,
            message: "Vous n'avez pas accès à cette ressource"
        });
        return;
    }

    const SQLRequest =
      "SELECT " +
      "COURS.idCours, COURS.intitule, " +
      "FILIERE_LANGUE.idFiliereLangue, FILIERE_LANGUE.codeFiliereLangue, " +
      "INTERVENANT.nomUsuel, INTERVENANT.prenom, PARTICIPE_A.idIntervenant " +
      "FROM COURS " +
      "LEFT JOIN CONCERNE ON COURS.idCours = CONCERNE.idCours " +
      "LEFT JOIN FILIERE_LANGUE ON FILIERE_LANGUE.idFiliereLangue = CONCERNE.idFiliereLangue " +
      "LEFT JOIN PARTICIPE_A ON COURS.idCours = PARTICIPE_A.idCours " +
      "LEFT JOIN INTERVENANT ON INTERVENANT.idIntervenant = PARTICIPE_A.idIntervenant"
    connexion.query(SQLRequest, function (err, data) {

        if (err) {
            res.status(500).json(err);
        }
        else if (data.length === 0) {
            res.status(204).json({});
        }
        else {
            res.status(200).json(data);
            console.log("FUNCTION CALL : [GET] - Affichage de tous les cours");
        }
    });
});

module.exports = router;
