import headers from './headers.service'

const axios = require('axios')

const API_URL_SEANC_INTERVENANTS = "http://localhost:8080/getSeanceIntervenants";
const API_URL_INTERVENANTS = "http://localhost:8080/intervenants";
class SeanceService {
  /* Gestionnaire */
  getSeance(id) {
    return axios.get(API_URL_SEANC_INTERVENANTS + "?idIntervenant=" + id, headers())
  }
  updateSeance(user) {
    return axios.post(API_URL_SEANC_INTERVENANTS, user, headers())
  }
  createSeance(user) {
    return axios.put(API_URL_SEANC_INTERVENANTS, user, headers())
  }
  deleteSeance(user) {
    return axios.delete(API_URL_SEANC_INTERVENANTS, {data: user}, headers())
  }
  /* Intervenant */
  getIntervenants() {
    return axios.get(API_URL_INTERVENANTS, headers())
  }
  updateIntervenant(user) {
    return axios.post(API_URL_INTERVENANTS, user, headers())
  }
  createIntervenant(user) {
    return axios.put(API_URL_INTERVENANTS, user, headers())
  }
  deleteIntervenant(user) {
    return axios.delete(API_URL_INTERVENANTS, {data: user}, headers())
  }
}
export default new SeanceService();
