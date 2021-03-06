const reader = require("../dataParser.js");
const data = reader.parseTxt("./data.txt")[0];

const crabWalk = {
  formatData: (data) => {
    // format as array of number type
    return data.split(",").map(Number);
  },
  getMinAndMaxNumber: (dataSet) => {
    const min = Math.min.apply(null, dataSet);
    const max = Math.max.apply(null, dataSet);
    return {
      min,
      max,
    };
  },
  findArrayOfPositions: (dataFormatted, min, max) => {
    const movesPerColumn = [];
    const loopsRequired = max - min;

    for (let i = 0; i < loopsRequired; i++) {
      let moves = 0;
      dataFormatted.forEach((item) => {
        // instead of determining which one is larger just get absolute value of horizontal moves needed
        let currentRowDistance = Math.abs(item - i);

        // to get the sume of numbers between 1 and horizontal distance needed to travel
        const newMoves = (currentRowDistance * (currentRowDistance + 1)) / 2;
        moves = moves + newMoves;
      });
      movesPerColumn.push(moves);
    }
    return movesPerColumn;
  },
  findLeastMoves: (movesPerColumn) => {
    return Math.min.apply(null, movesPerColumn);
  },
};

const main = () => {
  const {
    getMinAndMaxNumber,
    formatData,
    findArrayOfPositions,
    findLeastMoves,
  } = crabWalk;
  const dataFormatted = formatData(data);
  const { min, max } = getMinAndMaxNumber(dataFormatted);
  const movesPerColumn = findArrayOfPositions(dataFormatted, min, max);
  const leastMoves = findLeastMoves(movesPerColumn);
  return leastMoves;
};

console.log(main());
