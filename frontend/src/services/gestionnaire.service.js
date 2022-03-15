import headers from './headers.service'

const axios = require('axios')

const API_URL_COMPOSANTE = "http://localhost:8080/api/composantes"
const API_URL_COURS = "http://localhost:8080/cours"
const API_URL_FILIERE = "http://localhost:8080/filiereslangue"
class GestionnaireService {
  /* Composante */
  getComposante() {
    return axios.get(API_URL_COMPOSANTE, headers())
  }
  updateComposante(item) {
    return axios.post(API_URL_COMPOSANTE, item, headers())
  }
  createComposante(item) {
    return axios.put(API_URL_COMPOSANTE, item, headers())
  }
  deleteComposante(item) {
    return axios.delete(API_URL_COMPOSANTE, {data: item}, headers())
  }
  /* Cours */
  getCours() {
    return axios.get(API_URL_COURS, headers())
  }
  updateCours(item) {
    return axios.post(API_URL_COURS, item, headers())
  }
  createCours(item) {
    return axios.put(API_URL_COURS, item, headers())
  }
  deleteCours(item) {
    return axios.delete(API_URL_COURS, {data: item}, headers())
  }
  /* Filiere */
  getFilieres() {
    return axios.get(API_URL_FILIERE, headers())
  }
  updateFiliere(item) {
    return axios.post(API_URL_FILIERE, item, headers())
  }
  createFiliere(item) {
    return axios.put(API_URL_FILIERE, item, headers())
  }
  deleteFiliere(item) {
    return axios.delete(API_URL_FILIERE, {data: item}, headers())
  }
}
export default new GestionnaireService();
