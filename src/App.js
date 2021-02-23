import React, {useEffect, useState} from 'react';
import './App.css';
import PerseveranceParachute from "./perseverance-parachute";

function encodeTextToPosition(text) {
    const encodedArray = [...text].map(a => parseInt(a, 36) - 9).filter(a => a >= 0);
    const paddingArray = Array(8 - encodedArray.length).fill(0);

    const array = encodedArray.concat(paddingArray);

    return array.map(num => (num >>> 0).toString(2).padStart(8, "0"))
}

function encodeCoordinatesToPosition(outerRing) {
    const coordinates = outerRing.split(' ');

    const nOrS = [coordinates[3]].map(a => parseInt(a, 36) - 9).filter(a => a >= 0);
    const eOrW = [coordinates[7]].map(a => parseInt(a, 36) - 9).filter(a => a >= 0);

    const array = [coordinates[0], coordinates[1], coordinates[2], nOrS, coordinates[4], coordinates[5], coordinates[6],  eOrW];

    return array.map(num => (num >>> 0).toString(2).padStart(8, "0"))
}

function isCoordinatesValid(outerRing) {
    const coordinates = outerRing.split(' ');

    return 0 <= coordinates[0] && coordinates[0] <= 180
        && 0 <= coordinates[1] &&  coordinates[1] <= 180
        && 0 <= coordinates[2] &&  coordinates[2] <= 180
        && (coordinates[3]  === "N" ||  coordinates[3] === "S")
        && 0 <= coordinates[4] && coordinates[4] <= 180
        && 0 <= coordinates[5] &&  coordinates[5] <= 180
        && 0 <= coordinates[6] &&  coordinates[6] <= 180
        && (coordinates[7] === "W" ||  coordinates[7] === "E");
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
    setEncodedInnerRing(encodeTextToPosition(innerRing))
  }, [innerRing])

  useEffect(() => {
    setEncodedSecondRing(encodeTextToPosition(secondRing))
  }, [secondRing])

  useEffect(() => {
    setEncodedThirdRing(encodeTextToPosition(thirdRing))
  }, [thirdRing])

  useEffect(() => {
    if (isCoordinatesValid(outerRing)) {
        setEncodedOuterRing(encodeCoordinatesToPosition(outerRing))
    } else {
        setEncodedOuterRing(EMPTY_ARRAY);
    }
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
              <div className="flex flex-row justify-between">
                  <input
                      className={`bg-white focus:outline-none focus:shadow-outline border ${isCoordinatesValid(outerRing) ? "border-gray-300": "border-red-300"} rounded py-2 px-4 block w-full appearance-none leading-normal mb-4`}
                      type="text"
                      id="outer-ring"
                      placeholder="34 11 58 N 118 10 31 W"
                      onChange={e => setOuterRing(e.target.value)}
                  />
              </div>
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
