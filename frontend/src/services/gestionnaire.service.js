import authHeader from './auth-headers';

const API_URL_COMPOSANTE = "http://localhost:8080/api/composante/"
const API_URL_COURS = "http://localhost:8080/api/cours/"
const API_URL_FILIERE = "http://localhost:8080/api/filiere/"
class GestionnaireService {
  /* Composante */
  getComposante() {
    return fetch(API_URL_COMPOSANTE, {method: "get", headers: authHeader()})
  }
  updateComposante(item) {
    return fetch(API_URL_COMPOSANTE, {method: "put", headers: authHeader(), body: JSON.stringify(item)})
  }
  createComposante(item) {
    return fetch(API_URL_COMPOSANTE, {method: "post", headers: authHeader(), body: JSON.stringify(item)})
  }
  deleteComposante(item) {
    return fetch(API_URL_COMPOSANTE, {method: "delete", headers: authHeader(), body: JSON.stringify(item)})
  }
  /* Cours */
  getCours() {
    return fetch(API_URL_COURS, {method: "get", headers: authHeader()})
  }
  updateCours(item) {
    return fetch(API_URL_COURS, {method: "put", headers: authHeader(), body: JSON.stringify(item)})
  }
  createCours(item) {
    return fetch(API_URL_COURS, {method: "post", headers: authHeader(), body: JSON.stringify(item)})
  }
  deleteCours(item) {
    return fetch(API_URL_COURS, {method: "delete", headers: authHeader(), body: JSON.stringify(item)})
  }
  /* Filiere */
  getFiliere() {
    return fetch(API_URL_FILIERE, {method: "get", headers: authHeader()})
  }
  updateFiliere(item) {
    return fetch(API_URL_FILIERE, {method: "put", headers: authHeader(), body: JSON.stringify(item)})
  }
  createFiliere(item) {
    return fetch(API_URL_FILIERE, {method: "post", headers: authHeader(), body: JSON.stringify(item)})
  }
  deleteFiliere(item) {
    return fetch(API_URL_FILIERE, {method: "delete", headers: authHeader(), body: JSON.stringify(item)})
  }
}
export default new GestionnaireService();
