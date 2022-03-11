import authHeader from './auth-headers';
const axios = require('axios')

const API_URL_COMPOSANTE = "http://localhost:8080/api/composante"
const API_URL_COURS = "http://localhost:8080/cours"
const API_URL_FILIERE = "http://localhost:8080/filiereslangue"
class GestionnaireService {
  /* Composante */
  getComposante() {
    return axios.get(API_URL_COMPOSANTE)
  }
  updateComposante(item) {
    return axios.post(API_URL_COMPOSANTE, item)
  }
  createComposante(item) {
    return axios.put(API_URL_COMPOSANTE, item)
  }
  deleteComposante(item) {
    return axios.delete(API_URL_COMPOSANTE, {data: item})
  }
  /* Cours */
  getCours() {
    return axios.get(API_URL_COURS)
  }
  updateCours(item) {
    return axios.post(API_URL_COURS, item)
  }
  createCours(item) {
    return axios.put(API_URL_COURS, item)
  }
  deleteCours(item) {
    return axios.delete(API_URL_COURS, {data: item})
  }
  /* Filiere */
  getFilieres() {
    return axios.get(API_URL_FILIERE)
  }
  updateFiliere(item) {
    return axios.post(API_URL_FILIERE, item)
  }
  createFiliere(item) {
    return axios.put(API_URL_FILIERE, item)
  }
  deleteFiliere(item) {
    return axios.delete(API_URL_FILIERE, {data: item})
  }
}
export default new GestionnaireService();
