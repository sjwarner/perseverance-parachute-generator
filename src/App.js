import React, {useEffect, useState} from 'react';
import './App.css';
import PerseveranceParachute from "./perseverance-parachute";

function encodeToPosition(text) {
    const encodedArray = [...text].map(a => parseInt(a, 36) - 9).filter(a => a >= 0);
    const paddingArray = Array(8 - encodedArray.length).fill(0);

    const array = encodedArray.concat(paddingArray);

    return array.map(num => (num >>> 0).toString(2).padStart(8, "0"))
}

const EMPTY_ARRAY = ["00000000", "00000000", "00000000", "00000000", "00000000", "00000000", "00000000", "00000000"]

const App = () => {
  const [innerRing, setInnerRing] = useState("");
  const [secondRing, setSecondRing] = useState("");
  const [thirdRing, setThirdRing] = useState("");
  const [outerRing, setOuterRing] = useState("");

  const [encodedInnerRing, setEncodedInnerRing] = useState(EMPTY_ARRAY);
  const [encodedSecondRing, setEncodedSecondRing] = useState(EMPTY_ARRAY);
  const [encodedThirdRing, setEncodedThirdRing] = useState(EMPTY_ARRAY);
  const [encodedOuterRing, setEncodedOuterRing] = useState(EMPTY_ARRAY);

  useEffect(() => {
    setEncodedInnerRing(encodeToPosition(innerRing))
  }, [innerRing])

  useEffect(() => {
    setEncodedSecondRing(encodeToPosition(secondRing))
  }, [secondRing])

  useEffect(() => {
    setEncodedThirdRing(encodeToPosition(thirdRing))
  }, [thirdRing])

  useEffect(() => {
    setEncodedOuterRing(encodeToPosition(outerRing))
  }, [outerRing])

  return (
    <div className="App flex flex-row">
      <div className="flex flex-col Parachute-pane">
        <PerseveranceParachute
          encodedInnerRing={encodedInnerRing}
          encodedSecondRing={encodedSecondRing}
          encodedThirdRing={encodedThirdRing}
          encodedOuterRing={encodedOuterRing}
        />
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
              maxLength={8}
              onChange={e => setOuterRing(e.target.value)}
            />
            <label htmlFor="outer-ring">2nd Ring</label>
            <input
              className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none leading-normal mb-4"
              type="text"
              id="2nd-ring"
              placeholder="THINGS"
              maxLength={8}
              onChange={e => setSecondRing(e.target.value)}
            />
            <label htmlFor="outer-ring">3rd Ring</label>
            <input
              className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none leading-normal mb-4"
              type="text"
              id="3rd-ring"
              placeholder="MIGHTY"
              maxLength={8}
              onChange={e => setThirdRing(e.target.value)}
            />
            <label htmlFor="outer-ring">Inner Ring</label>
            <input
              className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none leading-normal mb-4"
              type="text"
              id="inner-ring"
              placeholder="DARE"
              maxLength={8}
              onChange={e => setInnerRing(e.target.value)}
            />
          </div>
      </div>
    </div>
  );
}

export default App;
