import authHeader from './auth-headers';
const axios = require('axios')

const API_URL_GESTIONNAIRES = "http://localhost:8080/gestionnaires";
const API_URL_INTERVENANTS = "http://localhost:8080/intervenants";
class AdministrationService {
  /* Gestionnaire */
  getGestionnaires() {
    return axios.get(API_URL_GESTIONNAIRES)
  }
  updateGestionnaire(user) {
    return axios.post(API_URL_GESTIONNAIRES, user)
  }
  createGestionnaire(user) {
    return axios.put(API_URL_GESTIONNAIRES, user)
  }
  deleteGestionnaire(user) {
    return axios.delete(API_URL_GESTIONNAIRES, {data: user})
  }
  /* Intervenant */
  getIntervenants() {
    return axios.get(API_URL_INTERVENANTS)
  }
  updateIntervenant(user) {
    return axios.post(API_URL_INTERVENANTS, user)
  }
  createIntervenant(user) {
    return axios.put(API_URL_INTERVENANTS, user)
  }
  deleteIntervenant(user) {
    return axios.delete(API_URL_INTERVENANTS, {data: user})
  }
}
export default new AdministrationService();
