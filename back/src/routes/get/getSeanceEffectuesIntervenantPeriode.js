const connexion = require("../../db/sql");
const router = require('express').Router();

router.get('/getSeanceEffectuesIntervenantPeriode', jwtManager.verifyToken, (req, res) => {

    const { idIntervenant, annee, mois } = req.query;

    let sql = "SELECT nomUsuel as nomIntervenant, prenom as prenomIntervenant, SEANCE_FORMATION.idSeanceFormation, dureeEffective, date_heure, type as typeCours, salle, intitule as nomCours " +
        "FROM SEANCE_FORMATION " +
        "JOIN INTERVENANT ON INTERVENANT.idIntervenant = SEANCE_FORMATION.idIntervenant " +
        "JOIN CRENEAU ON CRENEAU.idCreneau = SEANCE_FORMATION.idCreneau " +
        "JOIN COURS ON COURS.idCours = CRENEAU.idCours " +
        "WHERE estEffectue = 1 AND SEANCE_FORMATION.idIntervenant = ? AND YEAR(date_heure) = ? AND MONTH(date_heure) = ? " +
        "ORDER BY COURS.intitule";
    connexion.query(sql, [idIntervenant, annee, mois], function (err, data) {

        if (err) {
            res.status(500).json(err);
        }
        else if (data.length === 0) {
            res.status(204).json({});
        }
        else {
            var total = data[0].totalHeures/10000;
            res.status(200).json({data});
            console.log("FUNCTION CALL : [GET] - calcul total des seances intervenant sur la periode "+mois+ " " + annee);
        }
    });
});

module.exports = router;
