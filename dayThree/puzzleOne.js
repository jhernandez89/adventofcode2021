const reader = require("../dataParser.js");
const data = reader.parseTxt("./data.txt");

const calculateGammaAndEpislom = {
  getValues: (binarySet) => {
    const values = [];
    binarySet.forEach((binaryRow) => {
      // split th strings to get the individual numbers
      const binaryRowSplit = binaryRow.split("");
      binaryRowSplit.forEach((item, i) => {
        // Make sure values exist and initialized
        if (!values[i]) values[i] = {};
        if (!values[i][0]) values[i][0] = 0;
        if (!values[i][1]) values[i][1] = 0;

        // push the count of both 0 and 1s
        if (item === "1") {
          values[i][1] += 1;
        } else {
          values[i][0] += 1;
        }
      });
    });
    return values;
  },

  parseValues: (measurements) => {
    let gammaBinary = "";
    let epsilonBinary = "";

    //Assign 0s and 1s to gamma and epsilon based on the frequency of 0s and 1s
    measurements.forEach((item) => {
      if (item[0] < item[1]) {
        gammaBinary += "1";
        epsilonBinary += "0";
      } else {
        gammaBinary += "0";
        epsilonBinary += "1";
      }
    });
    return { gammaBinary, epsilonBinary };
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

  const measurements = getValues(data);
  const binaryResults = parseValues(measurements);
  const answer = multiplyBinaryNumbers(
    binaryResults.gammaBinary,
    binaryResults.epsilonBinary
  );

  return answer;
};

console.log(main());
