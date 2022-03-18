import headers from './headers.service'
import Auth from './auth.service'

const axios = require('axios')

const API_URL_SEANCES = "http://localhost:8080/seances";
const API_URL_SEANCE_INTERVENANTS = "http://localhost:8080/getSeancesIntervenants";
class SeanceService {
  /* Séances */
  getSeances() {
    return axios.get(API_URL_SEANCES, headers())
  }
  /* Séances intervenants */
  getSeancesIntervenants() {
    return axios.get(API_URL_SEANCE_INTERVENANTS + "?idIntervenant=" + Auth.getCurrentId(), headers())
  }
  updateSeance(user) {
    return axios.post(API_URL_SEANCE_INTERVENANTS, user, headers())
  }
  createSeance(user) {
    return axios.put(API_URL_SEANCE_INTERVENANTS, user, headers())
  }
  deleteSeance(user) {
    return axios.delete(API_URL_SEANCE_INTERVENANTS, {data: user, ...headers()})
  }
}
export default new SeanceService();
