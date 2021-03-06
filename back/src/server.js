//include
const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");
const app = express();

const corsOptions = {
    origin : 'http://localhost:3000',
    optionsSuccessStatus: 200
}

app.use(bodyParser.json());
app.use(cors(corsOptions));

//init routes
app.get('/intervenants', require('./routes/get/getIntervenant'));
app.put('/intervenants', require('./routes/put/putIntervenant'));
app.post('/intervenants', require('./routes/post/postIntervenant'));
app.delete('/intervenants', require('./routes/delete/delIntervenant'));

app.get('/gestionnaires', require('./routes/get/getGestionnaire'));
app.put('/gestionnaires', require('./routes/put/putGestionnaire'));
app.post('/gestionnaires', require('./routes/post/postGestionnaire'));
app.delete('/gestionnaires', require('./routes/delete/delGestionnaire'));

app.get('/responsables', require('./routes/get/getResponsable'));
app.put('/responsables', require('./routes/put/putResponsable'));
app.post('/responsables', require('./routes/post/postResponsable'));
app.delete('/responsables', require('./routes/delete/delResponsable'));

app.get('/cours', require('./routes/get/getCours'));
app.put('/cours', require('./routes/put/putCours'));
app.post('/cours', require('./routes/post/postCours'));
app.delete('/cours', require('./routes/delete/delCours'));

app.get('/composantes', require('./routes/get/getComposante'));
app.put('/composantes', require('./routes/put/putComposante'));
app.post('/composantes', require('./routes/post/postComposante'));
app.delete('/composantes', require('./routes/delete/delComposante'));

app.get('/creneaux', require('./routes/get/getCreneau'));
app.put('/creneaux', require('./routes/put/putCreneau'));
app.post('/creneaux', require('./routes/post/postCreneau'));
app.delete('/creneaux', require('./routes/delete/delCreneau'));

app.get('/filiereslangue', require('./routes/get/getFiliereLangue'));
app.put('/filiereslangue', require('./routes/put/putFiliereLangue'));
app.post('/filiereslangue', require('./routes/post/postFiliereLangue'));
app.delete('/filiereslangue', require('./routes/delete/delFiliereLangue'));

app.post('/login', require('./routes/connexion/checkUserConnexion'));
app.post('/concerne', require('./routes/post/postConcerne'));
app.post('/participe', require('./routes/post/postParticipe'));

app.get('/getSeanceFormationByIdCreneau', require('./routes/get/getSeanceFormationByIdCreneau'));
app.get('/getSeancesIntervenants', require('./routes/get/getSeancesIntervenants')); //recupere toutes les seances li?? a un intervenant
app.get('/getSeanceIntervenantsEffectue', require('./routes/get/getSeancesIntervenantsEffectue')); //heures effectu?? pour que un gestionnaire valide
app.get('/getTotalHeuresIntervenants', require('./routes/get/getTotalHeureIntervenant')); //renvoie le total d'heures effectu?? par un intervenant

app.post('/seances', require('./routes/post/postSeance')); //pointage des heures pour l'intervenant et/ou validation du pointage par un gestionnaire
app.put('/seances', require('./routes/put/putSeance')); //cre??ation de la seance par un intervenant
app.get('/getSeanceEffectuesIntervenantPeriode', require('./routes/get/getSeanceEffectuesIntervenantPeriode')); // permet de recuperer les infos pour la producition du csv (voir trello)


//start server
app.listen(8080, function () {
    console.log('\nD??marrage du serveur r??ussi avec succ??s !\n')
});
