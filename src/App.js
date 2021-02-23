import logo from './logo.svg';
import './App.css';
import PerseveranceParachute from "./perseverance-parachute";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <PerseveranceParachute />
        <p>
          Encode your own parachute!
        </p>
        <a
          className="App-link"
          href="https://twitter.com/steltzner/status/1364076615932645379"
          target="_blank"
          rel="noopener noreferrer"
        >
          Inspired by the Perseverance Parachute code crackers
        </a>
      </header>
    </div>
  );
}

export default App;
