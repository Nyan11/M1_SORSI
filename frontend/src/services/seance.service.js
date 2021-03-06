import headers from './headers.service'
import Auth from './auth.service'

const axios = require('axios')

const API_URL_SEANCES = "http://localhost:8080/seances"
const API_URL_SEANCS_BY_ID_CRENEAU = "http://localhost:8080/getSeanceFormationByIdCreneau"
const API_URL_CRENEAUX = "http://localhost:8080/creneaux"

const API_URL_SEANCE_INTERVENANTS = "http://localhost:8080/getSeancesIntervenants"
class SeanceService {
  /* Séances */
  getCreneaux() {
    return axios.get(API_URL_CRENEAUX, headers())
  }
  getSeancesByIdCreneaux(id) {
    return axios.get(API_URL_SEANCS_BY_ID_CRENEAU + "?idCreneau=" + id, headers())
  }
  putCreneaux(creneaux) {
    return axios.put(API_URL_CRENEAUX, creneaux, headers())
  }
  postCreneaux(creneaux) {
    return axios.post(API_URL_CRENEAUX, creneaux, headers())
  }
  delCreneaux(creneaux) {
    return axios.delete(API_URL_CRENEAUX, {data: creneaux, ...headers()})
  }
  /* Séances intervenants */
  getSeancesIntervenants() {
    return axios.get(API_URL_SEANCE_INTERVENANTS + "?idIntervenant=" + Auth.getCurrentId(), headers())
  }
  updateSeance(user) {
    return axios.post(API_URL_SEANCES, user, headers())
  }
  createSeance(user) {
    return axios.put(API_URL_SEANCES, user, headers())
  }
  deleteSeance(user) {
    return axios.delete(API_URL_SEANCES, {data: user, ...headers()})
  }
}
export default new SeanceService();
