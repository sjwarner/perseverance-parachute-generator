import './App.css';
import PerseveranceParachute from "./perseverance-parachute";

function App() {
  return (
    <div className="App flex flex-row">
      <div className="flex flex-col Parachute-pane">
        <PerseveranceParachute />
          <p className="mt-4">
            Encode your own parachute!
          </p>
          <p>
              Inspired by the&nbsp;
              <a
                  className="text-blue-600"
                  href="https://twitter.com/steltzner/status/1364076615932645379"
                  target="_blank"
                  rel="noopener noreferrer"
              >
                  Perseverance Parachute code crackers
              </a>
          </p>
      </div>
      <div className="flex flex-col Input-pane">
          <div className="tw-input-field">
            <input
              className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none leading-normal mb-4"
              type="text"
              placeholder="Outer ring"
            />
            <input
              className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none leading-normal mb-4"
              type="text"
              placeholder="2nd Ring"
            />
            <input
              className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none leading-normal mb-4"
              type="text"
              placeholder="3rd Ring"
            />
            <input
              className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none leading-normal mb-4"
              type="text"
              placeholder="Inner ring"
            />
          </div>
      </div>
    </div>
  );
}

export default App;
