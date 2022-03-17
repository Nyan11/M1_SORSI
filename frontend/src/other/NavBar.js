import React, { Component } from 'react'
import { Outlet, Link } from 'react-router-dom'
import Auth from '../services/auth.service'


function setColor(color) {
  document.documentElement.style.setProperty('--main-color', color);
}
function loadFirstColor(path) {
  if (path === "") {
    setColor("#3b48b1")
  } else if (path === "login") {
    setColor("#a80082")
  } else if (path === "administration") {
    setColor("#04aa6d")
  } else if (path === "gestionnaire") {
    setColor("#ff6347")
  } else if (path === "responsable") {
    setColor("#a19932")
  } else if (path === "intervenant") {
    setColor("#3b48b1")
  } else {
    setColor("#3b48b1")
  }
}

export default class NavBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: window.location.pathname.split('/')[1],
    }
    loadFirstColor(this.state.selected)
  }
  changeLinkHome() {
    setColor("#3b48b1")
    this.setState({selected: ""})
  }
  changeLinkLogin() {
    setColor("#a80082")
    this.setState({selected: "login"})
  }
  changeLinkAdmin() {
    setColor("#04AA6D")
    this.setState({selected: "administration"})
  }
  changeLinkGest() {
    setColor("#ff6347")
    this.setState({selected: "gestionnaire"})
  }
  changeLinkResp() {
    setColor("#a19932")
    this.setState({selected: "responsable"})
  }
  changeLinkInt() {
    setColor("#3b48b1")
    this.setState({selected: "intervenant"})
  }
  changeLinkDisconnect() {
    Auth.logout()
    window.location.reload(false)
  }
  render() {
    return <div>
      <nav class="navbar">
        <ul>
          <li>
            <Link class={this.state.selected === "" ? "navbar-link-selected" : "navbar-link"} onClick={this.changeLinkHome.bind(this)} to="/">Home</Link>
          </li>
          <li>
            <Link class={this.state.selected === "login" ? "navbar-link-selected" : "navbar-link"} onClick={this.changeLinkLogin.bind(this)} to="/login">Login</Link>
          </li>
          <li>
            <Link class={this.state.selected === "administration" ? "navbar-link-selected" : "navbar-link"} onClick={this.changeLinkAdmin.bind(this)} to="/administration">Administration</Link>
          </li>
          <li>
            <Link class={this.state.selected === "gestionnaire" ? "navbar-link-selected" : "navbar-link"} onClick={this.changeLinkGest.bind(this)} to="/gestionnaire">Gestionnaire</Link>
          </li>
          <li>
            <Link class={this.state.selected === "responsable" ? "navbar-link-selected" : "navbar-link"} onClick={this.changeLinkResp.bind(this)} to="/responsable">Responsable</Link>
          </li>
          <li>
            <Link class={this.state.selected === "intervenant" ? "navbar-link-selected" : "navbar-link"} onClick={this.changeLinkInt.bind(this)} to="/intervenant">Intervenant</Link>
          </li>
          <li class="navbar-link-right">
            <div class="navbar-link" onClick={this.changeLinkDisconnect.bind(this)}>Deconnecter</div>
          </li>
        </ul>
      </nav>
      <Outlet />
    </div>
  }
}
