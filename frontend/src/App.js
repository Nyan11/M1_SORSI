import { Routes, Route } from "react-router-dom"
import './App.css'
import Administration from './administration/HomeAdministration'
import Gestionnaire from './gestionnaire/HomeGestionnaire'
import Responsable from './responsable/HomeResponsable'
import Intervenant from './intervenant/HomeIntervenant'
import Login from './other/Login'
import NavBar from './other/NavBar'
import NoMatch from './other/NoMatch'
import Auth from './services/auth.service'

function App() {
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
            element={<Login category="" />}
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
            path="responsable/*"
            element={<Responsable />}
          />
          <Route
            path="intervenant/*"
            element={<Intervenant />}
          />
          <Route
            path="*"
            element={<NoMatch path="/"/>}
          />
        </Route>
      </Routes>
    </div>
  );
}

function debugLog(log, category) {
  localStorage.setItem("isLog", log)
  localStorage.setItem("category", category)
  window.location.reload(false)
}

function Home() {
  var isLog = localStorage.getItem('isLog')
  if (isLog) {
    return (
      <div>
        <h2>Home</h2>
        <p>{localStorage.getItem('category')}</p>
        <button onClick={()=>{debugLog(true, "administrateur")}}>Log as user admin</button>
        <button onClick={()=>{debugLog(true, "gestionnaire")}}>Log as user gestionnaire</button>
        <button onClick={()=>{debugLog(true, "responsable")}}>Log as user responsable</button>
        <button onClick={()=>{debugLog(true, "intervenant")}}>Log as user intervenant</button>
        <button onClick={()=>{debugLog(false, "")}}>Remove user</button>
      </div>
    );
  } else {
    return (
      <div>
        <h2>Home</h2>
        <button onClick={()=>{debugLog(true, "administrateur")}}>Log as user admin</button>
        <button onClick={()=>{debugLog(true, "gestionnaire")}}>Log as user gestionnaire</button>
        <button onClick={()=>{debugLog(true, "responsable")}}>Log as user responsable</button>
        <button onClick={()=>{debugLog(true, "intervenant")}}>Log as user intervenant</button>
        <button onClick={()=>{debugLog(false, "")}}>Remove user</button>
      </div>
    );
  }
}

export default App;
