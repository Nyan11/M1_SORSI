const API_URL = "http://localhost:8080/api/auth/";
class AuthService {
  login(login, password) {
    return fetch(API_URL, {method: "post", body: JSON.stringify({login: login, password: password})})
      .then(response => {
        if(response.ok && response.data.accessToken) {
          localStorage.setItem("token", JSON.stringify(response.data.token))
          localStorage.setItem("isLog", true)
          localStorage.setItem("category", JSON.stringify(response.data.category))
        }
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
    return localStorage.getItem("isLog") && localStorage.getItem("category") === "administrateur"
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
