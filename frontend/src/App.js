import { Routes, Route, Outlet, Link } from "react-router-dom"
import './App.css'
import Administration from './administration/Administration'
import Gestionnaire from './gestionnaire/Gestionnaire'
import Login from './other/Login'
import NavBar from './other/NavBar'
import Auth from './services/auth.service'

function App() {
  Auth.debugLocal()
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<NavBar />}>
          <Route
            index
            element={<Home />}
          />
          <Route
            path="login"
            element={<Login />}
          />
          <Route
            path="administration/*"
            element={<Administration />}
          />
          <Route
            path="gestionnaire/*"
            element={<Gestionnaire />}
          />
          <Route
            path="*"
            element={<NoMatch />}
          />
        </Route>
      </Routes>
    </div>
  );
}

function Home() {
  return (
    <div>
      <h2>Home</h2>
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

export default App;
