import React, { useEffect, useState } from "react";
import FeatherIcon from "feather-icons-react";
import queryString from "query-string";

import InputPane from "./InputPane";
import PerseveranceParachute from "./PerseveranceParachute";
import {
  encodeTextToPosition,
  encodeCoordinatesToPosition,
  isCoordinatesValid,
  EMPTY_ARRAY,
} from "./utils.js";

import "./App.css";

const App = () => {
  const [firstWord, setFirstWord] = useState(
    queryString.parse(window.location.search).first
      ? queryString.parse(window.location.search).first
      : "DARE"
  );
  const [secondWord, setSecondWord] = useState(
    queryString.parse(window.location.search).second
      ? queryString.parse(window.location.search).second
      : "MIGHTY"
  );
  const [thirdWord, setThirdWord] = useState(
    queryString.parse(window.location.search).third
      ? queryString.parse(window.location.search).third
      : "THINGS"
  );
  const [locationCoordinates, setLocationCoordinates] = useState(
    queryString.parse(window.location.search).coords
      ? queryString.parse(window.location.search).coords
      : "34 11 58 N 118 10 31 W"
  );

  const [encodedFirstWord, setEncodedFirstWord] = useState(EMPTY_ARRAY);
  const [encodedSecondWord, setEncodedSecondWord] = useState(EMPTY_ARRAY);
  const [encodedThirdWord, setEncodedThirdWord] = useState(EMPTY_ARRAY);
  const [encodedLocationCoordinates, setEncodedLocationCoordinates] = useState(
    EMPTY_ARRAY
  );

  useEffect(() => {
    setEncodedFirstWord(encodeTextToPosition(firstWord));
  }, [firstWord]);

  useEffect(() => {
    setEncodedSecondWord(encodeTextToPosition(secondWord));
  }, [secondWord]);

  useEffect(() => {
    setEncodedThirdWord(encodeTextToPosition(thirdWord));
  }, [thirdWord]);

  useEffect(() => {
    if (isCoordinatesValid(locationCoordinates)) {
      setEncodedLocationCoordinates(
        encodeCoordinatesToPosition(locationCoordinates)
      );
    } else {
      setEncodedLocationCoordinates(EMPTY_ARRAY);
    }
  }, [locationCoordinates]);

  return (
    <div className="flex flex-col h-screen">
      <header className="py-5 bg-black text-white text-center">
        <h1 className="font-bold text-2xl">🚀 Msg2Mars 🚀</h1>
      </header>
      <div className="App flex flex-1 overflow-y-auto md:flex-row flex-col">
        <div className="flex flex-col Parachute-pane md:w-3/4 w-full p5 mt-4 mb-4 max-h-full">
          <PerseveranceParachute
            encodedInnerRing={encodedFirstWord}
            encodedSecondRing={encodedThirdWord}
            encodedThirdRing={encodedSecondWord}
            encodedOuterRing={encodedLocationCoordinates}
          />
        </div>
        <div className="flex flex-col Input-pane md:w-1/4 w-full md:mt-0 mt-4 p-4">
          <InputPane
            firstWord={firstWord}
            setFirstWord={setFirstWord}
            secondWord={secondWord}
            setSecondWord={setSecondWord}
            thirdWord={thirdWord}
            setThirdWord={setThirdWord}
            locationCoordinates={locationCoordinates}
            setLocationCoordinates={setLocationCoordinates}
          />
        </div>
      </div>
      <footer className="py-5 bg-black text-center text-white flex flex-row justify-between">
        <div>
          <p className="ml-8 mr-8">
            Inspired by the&nbsp;
            <a
              className="text-blue-300"
              href="https://github.com/tanyafish/parachute/blob/main/The%20Parachute%20Message.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              Perseverance Parachute code crackers
            </a>
          </p>
        </div>
        <div className="flex flex-row mr-8">
          <a
            href="https://github.com/sjwarner/perseverance-parachute-generator"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FeatherIcon icon="github" className="mr-4" />
          </a>
          <a
            href="https://twitter.com/msg2mars"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FeatherIcon icon="twitter" />
          </a>
        </div>
      </footer>
    </div>
  );
};

export default App;
