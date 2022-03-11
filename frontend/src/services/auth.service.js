const API_URL = "http://localhost:8080/api/auth/";
class AuthService {
  login(login, password) {
    return fetch(API_URL, {method: "post", body: JSON.stringify({login: login, password: password})})
      .then(response => {
        if(response.ok && response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data))
        }
        return true
      }).catch(error => {
        return false
      })
  }
  logout() {
    localStorage.removeItem("user");
  }
  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }
  debugLocal() {
    localStorage.setItem("user", JSON.stringify({accessToken: 'abcdef123'}))
  }
}
export default new AuthService();
