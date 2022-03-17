import headers from './headers.service'

const axios = require('axios')

const API_URL_GESTIONNAIRES = "http://localhost:8080/gestionnaires";
const API_URL_RESPONSABLES = "http://localhost:8080/responsables";
const API_URL_INTERVENANTS = "http://localhost:8080/intervenants";
class AdministrationService {
  /* Gestionnaire */
  getGestionnaires() {
    return axios.get(API_URL_GESTIONNAIRES, headers())
  }
  updateGestionnaire(user) {
    return axios.post(API_URL_GESTIONNAIRES, user, headers())
  }
  createGestionnaire(user) {
    return axios.put(API_URL_GESTIONNAIRES, user, headers())
  }
  deleteGestionnaire(user) {
    return axios.delete(API_URL_GESTIONNAIRES, {data: user}, headers())
  }
  /* Responsable */
  getResponsables() {
    return axios.get(API_URL_RESPONSABLES, headers())
  }
  updateResponsable(user) {
    return axios.post(API_URL_RESPONSABLES, user, headers())
  }
  createResponsable(user) {
    return axios.put(API_URL_RESPONSABLES, user, headers())
  }
  deleteResponsable(user) {
    return axios.delete(API_URL_RESPONSABLES, {data: user}, headers())
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
export default new AdministrationService();
