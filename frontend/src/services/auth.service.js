const axios = require('axios')

const API_URL = "http://localhost:8080/login";
const desactivate_security = true

class AuthService {
  login(login, password, category) {
    var type = -1
    if (category === 'administration') {
      type = 0
    } else if (category === 'gestionnaire') {
      type = 1
    } else if (category === 'responsable') {
      type = 2
    } else if (category === 'intervenant') {
      type = 3
    }
    return axios.post(API_URL, {login: login, password: password, type: type}).then(response => {
      localStorage.setItem("token", JSON.stringify({accessToken: response.data.jwt}))
      localStorage.setItem("id", JSON.stringify({id: response.data.id}))
      localStorage.setItem("isLog", true)
      localStorage.setItem("category", category)
      return true
    }).catch(error => {
      return false
    })
  }
  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("isLog");
    localStorage.removeItem("category");
  }
  getCurrentToken() {
    return JSON.parse(localStorage.getItem('token'));;
  }
  getCurrentId() {
    return JSON.parse(localStorage.getItem('id')).id;;
  }
  isLogAsAdmin() {
    return desactivate_security || (localStorage.getItem("isLog") && localStorage.getItem("category") === "administration")
  }
  isLogAsGestionnaire() {
    return desactivate_security || (localStorage.getItem("isLog") && localStorage.getItem("category") === "gestionnaire")
  }
  isLogAsIntervenant() {
    return desactivate_security || (localStorage.getItem("isLog") && localStorage.getItem("category") === "intervenant")
  }
  isLogAsResposnable() {
    return desactivate_security || (localStorage.getItem("isLog") && localStorage.getItem("category") === "responsable")
  }
}
export default new AuthService();
