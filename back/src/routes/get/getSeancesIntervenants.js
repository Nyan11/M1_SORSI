const connexion = require("../../db/sql");
const router = require('express').Router();

router.get('/getSeancesIntervenants', (req, res) => {

    const { idIntervenant } = req.query;

    let sql = "SELECT " +
    "SEANCE_FORMATION.idSeanceFormation as idSeance, INTERVENANT.idIntervenant, nomUsuel as nomIntervenant, estEffectue, dureeEffective, valide, commentaire, CRENEAU.idCreneau, date_heure, type as typeCours, salle, COURS.idCours, intitule as nomCours " +
    "FROM SEANCE_FORMATION " +
    "JOIN INTERVENANT ON INTERVENANT.idIntervenant = SEANCE_FORMATION.idIntervenant " +
    "JOIN CRENEAU ON CRENEAU.idCreneau = SEANCE_FORMATION.idCreneau " +
    "JOIN COURS ON COURS.idCours = CRENEAU.idCours " +
    "WHERE SEANCE_FORMATION.idIntervenant = ? " +
    "ORDER BY COURS.intitule";
    connexion.query(sql, [idIntervenant], function (err, data) {

        if (err) {
            res.status(500).json(err);
        }
        else if (data.length === 0) {
            res.status(204).json({});
        }
        else {
            res.status(200).json(data);
            console.log("FUNCTION CALL : [GET] - Affichage de tous les gestionnaires");
        }
    });
});

module.exports = router;
