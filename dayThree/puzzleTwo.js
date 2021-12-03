const reader = require("../dataParser.js");
const data = reader.parseTxt("./data.txt");

const calculateGammaAndEpislom = {
  getValues: (binarySet, getMostCommon) => {
    let positionToCheck = 0;
    // loop until there is only one value left
    while (binarySet.length > 1) {
      const value = { 0: 0, 1: 0 };

      // need to get the frequency of the current position
      binarySet.forEach((row) => {
        const current = row[positionToCheck];
        if (current === "1") {
          value[1] += 1;
        } else {
          value[0] += 1;
        }
      });

      // determine whether we're getting the most or least frequent
      let numToUse;
      if (getMostCommon) {
        numToUse = value[1] >= value[0] ? "1" : "0";
      } else {
        numToUse = value[1] >= value[0] ? "0" : "1";
      }

      // filter out all unwanted values
      binarySet = binarySet.filter((row) => {
        const current = row[positionToCheck];
        return current === numToUse;
      });

      // check next position
      positionToCheck += 1;
    }
    return binarySet[0];
    // return value;
  },

  multiplyBinaryNumbers: (binaryNumOne, binaryNumTwo) => {
    // parse binary to numbers and multiply
    const numOne = parseInt(binaryNumOne, 2);
    const numTwo = parseInt(binaryNumTwo, 2);

    return numOne * numTwo;
  },
};

const main = () => {
  const { getValues, parseValues, multiplyBinaryNumbers } =
    calculateGammaAndEpislom;

  const mostCommon = getValues(data, true);
  const leastCommon = getValues(data, false);
  // const binaryResults = parseValues(measurements);
  const answer = multiplyBinaryNumbers(mostCommon, leastCommon);

  return answer;
};

console.log(main());
