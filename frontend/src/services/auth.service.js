const axios = require('axios')

const API_URL = "http://localhost:8080/login";

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
      localStorage.setItem("token", JSON.stringify({accessToken: response.data}))
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
  isLogAsAdmin() {
    return localStorage.getItem("isLog") && localStorage.getItem("category") === "administration"
  }
  isLogAsGestionnaire() {
    return localStorage.getItem("isLog") && localStorage.getItem("category") === "gestionnaire"
  }
  isLogAsIntervenant() {
    return localStorage.getItem("isLog") && localStorage.getItem("category") === "intervenant"
  }
  debugLocal() {
    localStorage.setItem("token", JSON.stringify({accessToken: 'abcdef123'}))
  }
}
export default new AuthService();
