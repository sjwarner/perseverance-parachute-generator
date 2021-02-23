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
            <label htmlFor="outer-ring">Outer Ring</label>
            <input
              className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none leading-normal mb-4"
              type="text"
              id="outer-ring"
              placeholder="N 118 10 31 W 34 11 58"
            />
            <label htmlFor="outer-ring">2nd Ring</label>
            <input
              className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none leading-normal mb-4"
              type="text"
              id="2nd-ring"
              placeholder="THINGS"
            />
            <label htmlFor="outer-ring">3rd Ring</label>
            <input
              className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none leading-normal mb-4"
              type="text"
              id="3rd-ring"
              placeholder="MIGHTY"
            />
            <label htmlFor="outer-ring">Inner Ring</label>
            <input
              className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none leading-normal mb-4"
              type="text"
              id="inner-ring"
              placeholder="DARE"
            />
          </div>
      </div>
    </div>
  );
}

export default App;
