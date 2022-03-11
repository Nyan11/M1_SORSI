import React, { Component } from 'react';
import { Routes, Route, Outlet, Link } from "react-router-dom"
import Composante from './composantes/Composantes'
import Filiere from './filieres/Filieres'
import Cours from './cours/Cours'

class NavBarGestionnaire extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: window.location.pathname.split("/gestionnaire")[1],
    }
  }
  changeLinkHome() {
    this.setState({selected: ""})
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
  render() {
    return <div>
      <nav class="navbar">
        <ul>
          <li>
            <Link
              class={this.state.selected === "" ? "navbar-link-selected" : "navbar-link"}
              onClick={this.changeLinkHome.bind(this)}
              to="/gestionnaire"
            >Home
            </Link>
          </li>
          <li>
            <Link
              class={this.state.selected === "/composante" ? "navbar-link-selected" : "navbar-link"}
              onClick={this.changeLinkComposante.bind(this)}
              to="/gestionnaire/composante"
            >Composante
            </Link>
          </li>
          <li>
            <Link
              class={this.state.selected === "/filiere" ? "navbar-link-selected" : "navbar-link"}
              onClick={this.changeLinkFiliere.bind(this)}
              to="/gestionnaire/filiere"
            >Filiere
            </Link>
          </li>
          <li>
            <Link
              class={this.state.selected === "/cours" ? "navbar-link-selected" : "navbar-link"}
              onClick={this.changeLinkCours.bind(this)}
              to="/gestionnaire/cours"
            >Cours
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
      <h2>Section Gestionnaire</h2>
      <div class="container">
        <Composante />
        <Filiere />
        <Cours />
      </div>
    </div>
  );
}

function NoMatch() {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
}

export default class Gestionnaire extends Component {
  render() {
    return <div className="App">
      <Routes>
        <Route path="/" element={<NavBarGestionnaire />}>
          <Route index element={<Home />} />
          <Route path="composante" element={<Composante />} />
          <Route path="filiere" element={<Filiere />} />
          <Route path="cours" element={<Cours />} />
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </div>
  }
}
