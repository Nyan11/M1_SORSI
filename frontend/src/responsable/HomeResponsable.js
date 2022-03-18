import React, { Component } from 'react';
import { Routes, Route, Outlet, Link } from "react-router-dom"
import Composante from './composantes/Composantes'
import Creneau from './creneaux/Creneaux'
import Filiere from './filieres/Filieres'
import Cours from './cours/Cours'
import Login from '../other/Login'
import Auth from '../services/auth.service'
import NoMatch from '../other/NoMatch'

class NavBarResponsable extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: window.location.pathname.split("/responsable")[1],
    }
  }
  changeLinkHome() {
    this.setState({selected: ""})
  }
  changeLinkLogin() {
    this.setState({selected: "/login"})
  }
  changeLinkComposante() {
    this.setState({selected: "/composante"})
  }
  changeLinkFiliere() {
    this.setState({selected: "/filiere"})
  }
  changeLinkCours() {
    this.setState({selected: "/cours"})
  }
  changeLinkCreneau() {
    this.setState({selected: "/creneau"})
  }
  render() {
    return <div>
      <nav class="navbar">
        <ul>
          <li>
            <Link
              class={this.state.selected === "" ? "navbar-link-selected" : "navbar-link"}
              onClick={this.changeLinkHome.bind(this)}
              to="/responsable"
            >Home
            </Link>
          </li>
          <li>
            <Link
              class={this.state.selected === "/login" ? "navbar-link-selected" : "navbar-link"}
              onClick={this.changeLinkLogin.bind(this)}
              to="/responsable/login"
            >Login
            </Link>
          </li>
          <li>
            <Link
              class={this.state.selected === "/composante" ? "navbar-link-selected" : "navbar-link"}
              onClick={this.changeLinkComposante.bind(this)}
              to="/responsable/composante"
            >Composante
            </Link>
          </li>
          <li>
            <Link
              class={this.state.selected === "/filiere" ? "navbar-link-selected" : "navbar-link"}
              onClick={this.changeLinkFiliere.bind(this)}
              to="/responsable/filiere"
            >Filiere
            </Link>
          </li>
          <li>
            <Link
              class={this.state.selected === "/cours" ? "navbar-link-selected" : "navbar-link"}
              onClick={this.changeLinkCours.bind(this)}
              to="/responsable/cours"
            >Cours
            </Link>
          </li>
          <li>
            <Link
              class={this.state.selected === "/creneau" ? "navbar-link-selected" : "navbar-link"}
              onClick={this.changeLinkCreneau.bind(this)}
              to="/responsable/creneau"
            >Creneau
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
      <h2>Section Responsable</h2>
      <div class="container">
        <Composante />
        <Filiere />
        <Cours />
        <Creneau />
      </div>
    </div>
  );
}

export default class HomeResponsable extends Component {
  render() {
    if (Auth.isLogAsResposnable()) {
      return <div className="App">
        <Routes>
          <Route path="/" element={<NavBarResponsable />}>
            <Route index element={<Home />} />
            <Route path="login" element={<Login category="responsable"/>} />
            <Route path="composante" element={<Composante />} />
            <Route path="filiere" element={<Filiere />} />
            <Route path="cours" element={<Cours />} />
            <Route path="creneau" element={<Creneau />} />
            <Route path="*" element={<NoMatch path="/responsable"/>} />
          </Route>
        </Routes>
      </div>
    } else {
      return <Login category="responsable"/>
    }
  }
}
