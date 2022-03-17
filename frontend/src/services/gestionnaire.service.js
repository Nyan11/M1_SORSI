import headers from './headers.service'

const axios = require('axios')

const API_URL_COMPOSANTE = "http://localhost:8080/composantes"
const API_URL_COURS = "http://localhost:8080/cours"
const API_URL_CONCERNE = "http://localhost:8080/concerne"
const API_URL_PARTICIPE = "http://localhost:8080/participe"
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
  updateCours(cours, concerne, participe) {
    axios.post(API_URL_COURS, cours, headers())
    axios.post(API_URL_CONCERNE, {idCours: cours.idCours, filieres: concerne}, headers())
    axios.post(API_URL_PARTICIPE, {idCours: cours.idCours, intervenants: participe}, headers())
  }
  createCours(cours, concerne, participe) {
    axios.put(API_URL_COURS, { intitule: cours }, headers()).then(res => {
      axios.post(API_URL_CONCERNE, {idCours: res.data.idCours, filieres: concerne}, headers())
      return axios.post(API_URL_PARTICIPE, {idCours: res.data.idCours, intervenants: participe}, headers())
    })
  }
  deleteCours(cours) {
    return axios.delete(API_URL_COURS, {data: cours}, headers())
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
