import React, { Component } from 'react';
import { Routes, Route, Outlet, Link } from "react-router-dom"
import Gestionnaire from './Gestionnaire'
import Intervenant from './Intervenant'

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
  changeLinkGestionnaire() {
    this.setState({selected: "/gestionnaire"})
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

function Layout() {
  return (
    <div>
      <nav class="navbar">
        <ul>
          <li>
            <Link to="/administration">Home</Link>
          </li>
          <li>
            <Link to="/administration/gestionnaire">Gestionnaire</Link>
          </li>
          <li>
            <Link to="/administration/intervenant">Intervenant</Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </div>
  );
}

function Home() {
  return (
    <div>
      <h3>Section Administration</h3>
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

export default class Administration extends Component {
  render() {
    return <div className="App">
      <Routes>
        <Route path="/" element={<NavBarAdministration />}>
          <Route index element={<Home />} />
          <Route path="gestionnaire" element={<Gestionnaire />} />
          <Route path="intervenant" element={<Intervenant />} />
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </div>
  }
}
