import React, { Component } from 'react';
import { Routes, Route, Outlet, Link } from "react-router-dom"
import Composante from './composantes/Composantes'
import Filiere from './filieres/Filieres'
import Cours from './cours/Cours'

function Layout() {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/gestionnaire">Home</Link>
          </li>
          <li>
            <Link to="/gestionnaire/composante">Composante</Link>
          </li>
          <li>
            <Link to="/gestionnaire/filiere">Filiere</Link>
          </li>
          <li>
            <Link to="/gestionnaire/cours">Cours</Link>
          </li>
        </ul>
      </nav>

      <hr />

      <Outlet />
    </div>
  );
}

function Home() {
  return (
    <div>
      <h3>Section Gestionnaire</h3>
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
        <Route path="/" element={<Layout />}>
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

