import React, { Component } from 'react';
import { Routes, Route, Outlet, Link } from "react-router-dom"
import Creneaux from './Creneaux'
import Login from '../other/Login'
import Auth from '../services/auth.service'
import NoMatch from '../other/NoMatch'

class NavBarIntervenant extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: window.location.pathname.split("/intervenant")[1],
    }
  }
  changeLinkHome() {
    this.setState({selected: ""})
  }
  changeLinkLogin() {
    this.setState({selected: "/login"})
  }
  changeLinkGestionnaire() {
    this.setState({selected: "/creneaux"})
  }
  render() {
    return <div>
      <nav class="navbar">
        <ul>
          <li>
            <Link
              class={this.state.selected === "" ? "navbar-link-selected" : "navbar-link"}
              onClick={this.changeLinkHome.bind(this)}
              to="/intervenant"
            >Home
            </Link>
          </li>
          <li>
            <Link
              class={this.state.selected === "/login" ? "navbar-link-selected" : "navbar-link"}
              onClick={this.changeLinkLogin.bind(this)}
              to="/intervenant/login"
            >Login
            </Link>
          </li>
          <li>
            <Link
              class={this.state.selected === "/creneaux" ? "navbar-link-selected" : "navbar-link"}
              onClick={this.changeLinkGestionnaire.bind(this)}
              to="/intervenant/creneaux"
            >Creneaux
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
      <h3>Section Intervenant</h3>
      <div class="container">
        <Creneaux />
      </div>
    </div>
  );
}

export default class HomeIntervenant extends Component {
  render() {
    if (Auth.isLogAsIntervenant()) {
      return <div className="App">
        <Routes>
          <Route path="/" element={<NavBarIntervenant />}>
            <Route index element={<Home />} />
            <Route path="login" element={<Login category="intervenant" />} />
            <Route path="creneaux" element={<Creneaux />} />
            <Route path="*" element={<NoMatch path="/intervenant"/>} />
          </Route>
        </Routes>
      </div>
    } else {
        return <Login category="intervenant" />
    }
  }
}
