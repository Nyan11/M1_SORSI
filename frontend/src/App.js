import logo from './logo.svg';
import './App.css';
import AddGes from './administration/AddGestionnaire.js'
import LisGes from './administration/ListeGestionnaires.js'
import AddInt from './administration/AddIntervenant.js'
import LisInt from './administration/ListeIntervenants.js'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <AddGes />
        <LisGes />
        <AddInt />
        <LisInt />
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
