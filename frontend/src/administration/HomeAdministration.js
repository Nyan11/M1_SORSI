import React, { Component } from 'react';
import { Routes, Route, Outlet, Link } from "react-router-dom"
import Gestionnaires from './Gestionnaires'
import Responsables from './Responsables'
import Intervenants from './Intervenants'
import Login from '../other/Login'
import Auth from '../services/auth.service'
import NoMatch from '../other/NoMatch'

class NavBarAdministration extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: window.location.pathname.split("/administration")[1],
    }
  }
  changeLinkHome() {
    this.setState({selected: ""})
  }
  changeLinkLogin() {
    this.setState({selected: "/login"})
  }
  changeLinkGestionnaire() {
    this.setState({selected: "/gestionnaire"})
  }
  changeLinkResponsable() {
    this.setState({selected: "/responsable"})
  }
  changeLinkIntervenant() {
    this.setState({selected: "/intervenant"})
  }
  render() {
    return <div>
      <nav class="navbar">
        <ul>
          <li>
            <Link
              class={this.state.selected === "" ? "navbar-link-selected" : "navbar-link"}
              onClick={this.changeLinkHome.bind(this)}
              to="/administration"
            >Home
            </Link>
          </li>
          <li>
            <Link
              class={this.state.selected === "/login" ? "navbar-link-selected" : "navbar-link"}
              onClick={this.changeLinkLogin.bind(this)}
              to="/administration/login"
            >Login
            </Link>
          </li>
          <li>
            <Link
              class={this.state.selected === "/responsable" ? "navbar-link-selected" : "navbar-link"}
              onClick={this.changeLinkResponsable.bind(this)}
              to="/administration/responsable"
            >Responsable
            </Link>
          </li>
          <li>
            <Link
              class={this.state.selected === "/gestionnaire" ? "navbar-link-selected" : "navbar-link"}
              onClick={this.changeLinkGestionnaire.bind(this)}
              to="/administration/gestionnaire"
            >Gestionnaire
            </Link>
          </li>
          <li>
            <Link
              class={this.state.selected === "/intervenant" ? "navbar-link-selected" : "navbar-link"}
              onClick={this.changeLinkIntervenant.bind(this)}
              to="/administration/intervenant"
            >Intervenant
            </Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </div>
  }
}

function Home() {
  return (
    <div>
      <h3>Section Administration</h3>
      <div class="container">
        <Gestionnaires />
        <Responsables />
        <Intervenants />
      </div>
    </div>
  );
}

export default class HomeAdministration extends Component {
  render() {
    if (Auth.isLogAsAdmin()) {
      return <div className="App">
        <Routes>
          <Route path="/" element={<NavBarAdministration />}>
            <Route index element={<Home />} />
            <Route path="login" element={<Login category="administration" />} />
            <Route path="gestionnaire" element={<Gestionnaires />} />
            <Route path="responsable" element={<Responsables />} />
            <Route path="intervenant" element={<Intervenants />} />
            <Route path="*" element={<NoMatch path="/administration"/>} />
          </Route>
        </Routes>
      </div>
    } else {
      return <Login category="administration" />
    }
  }
}
