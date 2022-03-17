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

app.get('/reponsables', require('./routes/get/getResponsable'));
app.put('/reponsables', require('./routes/put/putResponsable'));
app.post('/reponsables', require('./routes/post/postResponsable'));
app.delete('/reponsables', require('./routes/delete/delResponsable'));

app.get('/cours', require('./routes/get/getCours'));
app.put('/cours', require('./routes/put/putCours'));
app.post('/cours', require('./routes/post/postCours'));
app.delete('/cours', require('./routes/delete/delCours'));

app.get('/composantes', require('./routes/get/getComposante'));
app.put('/composantes', require('./routes/put/putComposante'));
app.post('/composantes', require('./routes/post/postComposante'));
app.delete('/composantes', require('./routes/delete/delComposante'));

app.get('/filiereslangue', require('./routes/get/getFiliereLangue'));
app.put('/filiereslangue', require('./routes/put/putFiliereLangue'));
app.post('/filiereslangue', require('./routes/post/postFiliereLangue'));
app.delete('/filiereslangue', require('./routes/delete/delFiliereLangue'));

app.get('/getSeanceIntervenants', require('./routes/get/getSeancesIntervenants'));

app.post('/login', require('./routes/connexion/checkUserConnexion'));
app.post('/concerne', require('./routes/post/postConcerne'));
app.post('/participe', require('./routes/post/postParticipe'));

//start server
app.listen(8080, function () {
    console.log('\nDémarrage du serveur réussi avec succès !\n')
});
