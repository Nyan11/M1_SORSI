import authHeader from './auth-headers';

const API_URL_GESTIONNAIRE = "http://localhost:8080/api/gestionnaire/";
const API_URL_INTERVENANT = "http://localhost:8080/api/intervenant/";
class AdministrationService {
  /* Gestionnaire */
  getGestionnaires() {
    return fetch(API_URL_GESTIONNAIRE, {method: "post", headers: authHeader()})
  }
  updateGestionnaire(user) {
    return fetch(API_URL_GESTIONNAIRE, {method: "put", headers: authHeader(), body: JSON.stringify(user)})
  }
  createGestionnaire(user) {
    return fetch(API_URL_GESTIONNAIRE, {method: "post", headers: authHeader(), body: JSON.stringify(user)})
  }
  deleteGestionnaire(user) {
    return fetch(API_URL_GESTIONNAIRE, {method: "delete", headers: authHeader(), body: JSON.stringify(user)})
  }
  /* Intervenant */
  getIntervenants() {
    return fetch(API_URL_INTERVENANT, {method: "post", headers: authHeader()})
  }
  updateIntervenant(user) {
    return fetch(API_URL_GESTIONNAIRE, {method: "put", headers: authHeader(), body: JSON.stringify(user)})
  }
  createIntervenant(user) {
    return fetch(API_URL_GESTIONNAIRE, {method: "post", headers: authHeader(), body: JSON.stringify(user)})
  }
  deleteIntervenant(user) {
    return fetch(API_URL_GESTIONNAIRE, {method: "delete", headers: authHeader(), body: JSON.stringify(user)})
  }
}
export default new AdministrationService();
