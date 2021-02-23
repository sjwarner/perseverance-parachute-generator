import React, { useEffect, useState } from "react";
import FeatherIcon from "feather-icons-react";

import "./App.css";
import PerseveranceParachute from "./perseverance-parachute";

const saveSvgAsPng = require("save-svg-as-png");

function encodeTextToPosition(text) {
  const encodedArray = [...text]
    .map((a) => parseInt(a, 36) - 9)
    .filter((a) => a >= 0);
  const paddingArray = Array(8 - encodedArray.length).fill(0);

  const array = encodedArray.concat(paddingArray);

  return array.map((num) => (num >>> 0).toString(2).padStart(8, "0"));
}

function encodeCoordinatesToPosition(outerRing) {
  const coordinates = outerRing.split(/ |°|'|"/);

  const nOrS = [coordinates[3]]
    .map((a) => parseInt(a, 36) - 9)
    .filter((a) => a >= 0);
  const eOrW = [coordinates[7]]
    .map((a) => parseInt(a, 36) - 9)
    .filter((a) => a >= 0);

  const array = [
    coordinates[0],
    coordinates[1],
    coordinates[2],
    nOrS,
    coordinates[4],
    coordinates[5],
    coordinates[6],
    eOrW,
  ];

  return array.map((num) => (num >>> 0).toString(2).padStart(8, "0"));
}

function isCoordinatesValid(outerRing) {
  const coordinates = outerRing.split(/ |°|'|"/);

  return (
    0 <= coordinates[0] &&
    coordinates[0] <= 180 &&
    0 <= coordinates[1] &&
    coordinates[1] <= 180 &&
    0 <= coordinates[2] &&
    coordinates[2] <= 180 &&
    (coordinates[3] === "N" || coordinates[3] === "S") &&
    0 <= coordinates[4] &&
    coordinates[4] <= 180 &&
    0 <= coordinates[5] &&
    coordinates[5] <= 180 &&
    0 <= coordinates[6] &&
    coordinates[6] <= 180 &&
    (coordinates[7] === "W" || coordinates[7] === "E")
  );
}

const EMPTY_ARRAY = [
  "00000000",
  "00000000",
  "00000000",
  "00000000",
  "00000000",
  "00000000",
  "00000000",
  "00000000",
];

const App = () => {
  const [firstWord, setFirstWord] = useState("DARE");
  const [secondWord, setThirdWord] = useState("MIGHTY");
  const [thirdWord, setSecondWord] = useState("THINGS");
  const [locationCoordinates, setLocationCoordinates] = useState(
    "34 11 58 N 118 10 31 W"
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
            encodedSecondRing={encodedSecondWord}
            encodedThirdRing={encodedThirdWord}
            encodedOuterRing={encodedLocationCoordinates}
          />
        </div>
        <div className="flex flex-col Input-pane md:w-1/4 w-full md:mt-0 mt-4 p-4">
          <div className="flex flex-col justify-around">
            <label htmlFor="first-word">First word</label>
            <input
              className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none leading-normal mb-4"
              type="text"
              id="first-word"
              value={firstWord}
              placeholder="DARE"
              maxLength={8}
              onChange={(e) => setFirstWord(e.target.value)}
            />
            <label htmlFor="second-word">Second word</label>
            <input
              className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none leading-normal mb-4"
              type="text"
              id="second-word"
              value={secondWord}
              placeholder="MIGHTY"
              maxLength={8}
              onChange={(e) => setSecondWord(e.target.value)}
            />
            <label htmlFor="third-word">Third word</label>
            <input
              className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none leading-normal mb-4"
              type="text"
              id="third-word"
              value={thirdWord}
              placeholder="THINGS"
              maxLength={8}
              onChange={(e) => setThirdWord(e.target.value)}
            />
            <label htmlFor="location-coordinates">
              A location -{" "}
              <a
                className="text-blue-300"
                href="https://gisgeography.com/decimal-degrees-dd-minutes-seconds-dms/"
                target="_blank"
                rel="noopener noreferrer"
              >
                DMS Coordinates
              </a>
            </label>
            <input
              className={`bg-white focus:outline-none focus:shadow-outline ${
                isCoordinatesValid(locationCoordinates)
                  ? "border border-gray-300"
                  : "border-red-500 border-2"
              } rounded py-2 px-4 block w-full appearance-none leading-normal mb-4`}
              type="text"
              id="location-coordinates"
              value={locationCoordinates}
              placeholder="34 11 58 N 118 10 31 W"
              onChange={(e) => setLocationCoordinates(e.target.value)}
            />
            <button
              className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 border border-blue-700 rounded"
              onClick={() =>
                saveSvgAsPng.saveSvgAsPng(
                  document.getElementById("parachute"),
                  "parachute.png"
                )
              }
            >
              Save your parachute
            </button>
            <span className="mt-4 mb-4">Download your parachute and tweet it out #msg2mars</span>
            <a className="twitter-share-button text-center bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 border border-blue-700 rounded"
               href="https://twitter.com/intent/tweet?text=Make%20your%20own%20Perseverence%20Parachute%20secret%20message%20@Msg2Mars,%20over%20at%20https://sjwarner.github.io/perseverance-parachute-generator/%20#msg2mars">
              <span><FeatherIcon icon="twitter" className="inline-block mr-4" />Tweet</span>
            </a>
          </div>
        </div>
      </div>
      <footer className="py-5 bg-black text-center text-white flex flex-row justify-between">
        <div>
          <p className="ml-8">
            Inspired by the&nbsp;
            <a
              className="text-blue-300"
              href="https://twitter.com/steltzner/status/1364076615932645379"
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
