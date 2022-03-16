const connexion = require("../../db/sql");
const router = require('express').Router();

router.get('/cours', (req, res) => {
/*
    const SQLRequest =
      "SELECT " +
      "COURS.id, COURS.intitule, " +
      "FILIERE_LANGUE.idFiliereLangue, FILIERE_LANGUE.codeFiliereLangue, " +
      "INTERVENANT.nomUsuel, INTERVENANT.prenom, PARTICIPE_A.idIntervenant " +
      "FROM COURS, CONCERNE, FILIERE_LANGUE, PARTICIPE_A, INTERVENANT " +
      "WHERE COURS.id = CONCERNE.idCours " +
      "AND FILIERE_LANGUE.idFiliereLangue = CONCERNE.idFiliereLangue " +
      "AND INTERVENANT.id = PARTICIPE_A.idIntervenant " +
      "AND COURS.id = PARTICIPE_A.idCours ";
*/
    const SQLRequest =
      "SELECT " +
      "COURS.id, COURS.intitule, " +
      "FILIERE_LANGUE.idFiliereLangue, FILIERE_LANGUE.codeFiliereLangue, " +
      "INTERVENANT.nomUsuel, INTERVENANT.prenom, PARTICIPE_A.idIntervenant " +
      "FROM COURS " +
      "LEFT JOIN CONCERNE ON COURS.id = CONCERNE.idCours " +
      "LEFT JOIN FILIERE_LANGUE ON FILIERE_LANGUE.idFiliereLangue = CONCERNE.idFiliereLangue " +
      "LEFT JOIN PARTICIPE_A ON COURS.id = PARTICIPE_A.idCours " +
      "LEFT JOIN INTERVENANT ON INTERVENANT.id = PARTICIPE_A.idIntervenant"
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
