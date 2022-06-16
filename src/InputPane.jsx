import React from "react";
import FeatherIcon from "feather-icons-react";
import Tooltip from "react-simple-tooltip";
import { Capacitor } from "@capacitor/core";
import { Clipboard } from '@capacitor/clipboard';

import { isWordValid, isCoordinatesValid } from "./utils.js";

const saveSvgAsPng = require("save-svg-as-png");

const writeToClipboard = async (input) => {
    await Clipboard.write({
        string: input
    });
};

const InputPane = (props) => {
  return (
    <div className="flex flex-col justify-around">
      <label htmlFor="first-word">First word</label>
      <input
        className={`bg-white focus:outline-none focus:shadow-outline rounded py-2 px-4 block w-full appearance-none leading-normal mb-4 ${
          isWordValid(props.firstWord)
            ? "border border-gray-300"
            : "border-red-500 border-2"}`}
        type="text"
        id="first-word"
        value={props.firstWord}
        placeholder="DARE"
        maxLength={8}
        onChange={(e) => props.setFirstWord(e.target.value)}
      />
      <label htmlFor="second-word">Second word</label>
      <input
        className={`bg-white focus:outline-none focus:shadow-outline rounded py-2 px-4 block w-full appearance-none leading-normal mb-4 ${
          isWordValid(props.secondWord)
            ? "border border-gray-300"
            : "border-red-500 border-2"}`}
        type="text"
        id="second-word"
        value={props.secondWord}
        placeholder="MIGHTY"
        maxLength={8}
        onChange={(e) => props.setSecondWord(e.target.value)}
      />
      <label htmlFor="third-word">Third word</label>
      <input
        className={`bg-white focus:outline-none focus:shadow-outline rounded py-2 px-4 block w-full appearance-none leading-normal mb-4 ${
          isWordValid(props.thirdWord)
            ? "border border-gray-300"
            : "border-red-500 border-2"}`}
        type="text"
        id="third-word"
        value={props.thirdWord}
        placeholder="THINGS"
        maxLength={8}
        onChange={(e) => props.setThirdWord(e.target.value)}
      />
      <label htmlFor="location-coordinates" className="flex flex-row justify-between mb-1">
        <div>
          A location -{" "}
          <a
            className="text-blue-300"
            href="https://gisgeography.com/decimal-degrees-dd-minutes-seconds-dms/"
            target="_blank"
            rel="noopener noreferrer"
          >
            DMS Coordinates
          </a>
        </div>
        <Tooltip content="Because longitudes can range to 180, values larger than 127 (the largest representable value) will be encoded modulo 128." placement="left">
          <FeatherIcon icon="info" />
        </Tooltip>
      </label>
      <input
        className={`bg-white focus:outline-none focus:shadow-outline ${
          isCoordinatesValid(props.locationCoordinates)
            ? "border border-gray-300"
            : "border-red-500 border-2"
        } rounded py-2 px-4 block w-full appearance-none leading-normal mb-4`}
        type="text"
        id="location-coordinates"
        value={props.locationCoordinates}
        placeholder="34 11 58 N 118 10 31 W"
        onChange={(e) => props.setLocationCoordinates(e.target.value)}
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
        <FeatherIcon icon="download" className="inline-block mr-4" />
        Save your parachute
      </button>
      <span className="mt-4 mb-4">
        Download your parachute and tweet out your own&nbsp; 
        <a href="https://twitter.com/search?q=%23msg2mars"
          className="text-blue-300"
        >
          #msg2mars
        </a>
        , or share your
        link with friends!
      </span>
      <a
        className="twitter-share-button text-center bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 border border-blue-700 rounded mb-4"
        href="https://twitter.com/intent/tweet?url=https%3A%2F%2Fsjwarner.github.io%2Fperseverance-parachute-generator%2F&via=Msg2Mars&text=Make%20your%20own%20Perseverance%20Parachute%20secret%20message%21&hashtags=msg2mars%2Cmars2021%2CCountdownToMars"
        target="_blank"
        rel="noopener noreferrer"
      >
        <span>
          <FeatherIcon icon="twitter" className="inline-block mr-4" />
          Tweet
        </span>
      </a>
      <button
        className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 border border-blue-700 rounded md:mb-0 mb-4"
        onClick={async () => {
            if (Capacitor.getPlatform() === 'android') {
                await writeToClipboard(
                    `${window.location.href.split("?")[0]}?first=${encodeURI(
                        props.firstWord
                    )}&second=${encodeURI(props.secondWord)}&third=${encodeURI(
                        props.thirdWord
                    )}&coords=${encodeURI(props.locationCoordinates)}`)
            } else {
                await navigator.clipboard.writeText(
                    `${window.location.href.split("?")[0]}?first=${encodeURI(
                        props.firstWord
                    )}&second=${encodeURI(props.secondWord)}&third=${encodeURI(
                        props.thirdWord
                    )}&coords=${encodeURI(props.locationCoordinates)}`
                )
            }
        }}
      >
        <FeatherIcon icon="link" className="inline-block mr-4" />
        Copy link to clipboard
      </button>
    </div>
  );
};

export default InputPane;
