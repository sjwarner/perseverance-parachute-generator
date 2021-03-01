export function removeAccents(str) {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

export function encodeTextToPosition(text) {
  const encodedArray = [...text]
    .map((a) => parseInt(a, 36) - 9)
    .filter((a) => a >= 0);
  const paddingArray = Array(8 - encodedArray.length).fill(0);

  const array = encodedArray.concat(paddingArray);

  return array.map((num) => (num >>> 0).toString(2).padStart(8, "0"));
}

export function encodeCoordinatesToPosition(outerRing) {
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
    coordinates[4] % 128,
    coordinates[5],
    coordinates[6],
    eOrW,
  ];

  return array.map((num) => (num >>> 0).toString(2).padStart(8, "0"));
}

export function isWordValid(word) {
  return /^[A-Za-zÀ-ÖØ-öø-ÿ]*$/.test(word);
}

export function isCoordinatesValid(outerRing) {
  const coordinates = outerRing.split(/ |°|'|"/);

  return (
    0 <= coordinates[0] &&
    coordinates[0] <= 90 &&
    0 <= coordinates[1] &&
    coordinates[1] <= 60 &&
    0 <= coordinates[2] &&
    coordinates[2] <= 60 &&
    (coordinates[3] === "N" || coordinates[3] === "S") &&
    0 <= coordinates[4] &&
    coordinates[4] <= 180 &&
    0 <= coordinates[5] &&
    coordinates[5] <= 60 &&
    0 <= coordinates[6] &&
    coordinates[6] <= 60 &&
    (coordinates[7] === "W" || coordinates[7] === "E")
  );
}

export const EMPTY_ARRAY = [
  "00000000",
  "00000000",
  "00000000",
  "00000000",
  "00000000",
  "00000000",
  "00000000",
  "00000000",
];
