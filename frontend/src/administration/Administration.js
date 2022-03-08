import React, { Component } from 'react';
import { Routes, Route, Outlet, Link } from "react-router-dom"
import Gestionnaire from './Gestionnaire'
import Intervenant from './Intervenant'

function Layout() {
  return (
    <div>
      <nav>
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

      <hr />

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
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="gestionnaire" element={<Gestionnaire />} />
          <Route path="intervenant" element={<Intervenant />} />
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </div>
  }
}

