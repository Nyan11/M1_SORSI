const connexion = require("../../db/sql");
const router = require('express').Router();
const jwtManager = require('../../jwt/jwtManager');

router.get('/creneaux', jwtManager.verifyToken, (req, res) => {

    if (!jwtManager.checkPermission(3, jwtManager.getJtw(req.headers['x-access-token']))) {
        res.status(403).json({
            error: true,
            message: "Vous n'avez pas accès à cette ressource"
        });
        return;
    }

    let sql = "SELECT " +
    "SEANCE_FORMATION.idSeanceFormation, INTERVENANT.idIntervenant, nomUsuel, estEffectue, dureeEffective, valide, commentaire, CRENEAU.idCreneau, date_heure, type, salle, COURS.idCours, intitule " +
    "FROM SEANCE_FORMATION " +
    "JOIN INTERVENANT ON INTERVENANT.idIntervenant = SEANCE_FORMATION.idIntervenant " +
    "JOIN CRENEAU ON CRENEAU.idCreneau = SEANCE_FORMATION.idCreneau " +
    "JOIN COURS ON COURS.idCours = CRENEAU.idCours ";

    /*
    {"code":"ER_PARSE_ERROR","errno":1064,"sqlMessage":"You have an error in your SQL syntax; check the manual that corresponds to your MariaDB server version for the right syntax to use near '.idSeance, INTERVENANT.idIntervenant, nomUsuel as nomIntervenant, estEffectue...' at line 1","sqlState":"42000","index":0,"sql":"SELECT SEANCE_FORMATION.idSeanceFormation as SEANCE_FORMATION.idSeance, INTERVENANT.idIntervenant, nomUsuel as nomIntervenant, estEffectue, dureeEffective, valide, commentaire, idCreneau, date_heure, type as typeCours, salle, COURS.idCours, intitule as nomCours FROM SEANCE_FORMATION JOIN INTERVENANT ON INTERVENANT.idIntervenant = SEANCE_FORMATION.idIntervenant JOIN CRENEAU ON CRENEAU.idCreneau = SEANCE_FORMATION.idCreneau JOIN COURS ON COURS.idCours = CRENEAU.idCours ORDER BY SEANCE_FORMATION.idSeance"}
    */
    connexion.query(sql, function (err, data) {

        if (err) {
            res.status(500).json(err);
        }
        else if (data.length === 0) {
            res.status(200).json([]);
        }
        else {
            res.status(200).json(data);
            console.log("FUNCTION CALL : [GET] - Affichage des séances");
        }
    });
});

module.exports = router;
