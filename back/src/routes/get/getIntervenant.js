const connexion = require("../../db/sql");
const router = require('express').Router();

router.get('/intervenants', (req, res) => {

    const SQLRequest = "SELECT * FROM INTERVENANT";
    connexion.query(SQLRequest, function (err, data) {

        if (err) {
            res.status(500).json(err);
        }
        else if (data.length === 0) {
            res.status(204).json({});
        }
        else {
            res.status(200).json(data);
            console.log("FUNCTION CALL : [GET] - Affichage de tous les intervenants");
        }
    });
});

module.exports = router;