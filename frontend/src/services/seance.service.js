import headers from './headers.service'

const axios = require('axios')

const API_URL_SEANCES = "http://localhost:8080/seances";
const API_URL_SEANCE_INTERVENANTS = "http://localhost:8080/getSeanceIntervenants";
const API_URL_INTERVENANTS = "http://localhost:8080/intervenants";
class SeanceService {
  /* Séances */
  getSeances() {
    return axios.get(API_URL_SEANCES, headers())
  }
  /* Séances intervenants */
  getSeance(id) {
    return axios.get(API_URL_SEANCE_INTERVENANTS + "?idIntervenant=" + id, headers())
  }
  updateSeance(user) {
    return axios.post(API_URL_SEANCE_INTERVENANTS, user, headers())
  }
  createSeance(user) {
    return axios.put(API_URL_SEANCE_INTERVENANTS, user, headers())
  }
  deleteSeance(user) {
    return axios.delete(API_URL_SEANCE_INTERVENANTS, {data: user}, headers())
  }
}
export default new SeanceService();
