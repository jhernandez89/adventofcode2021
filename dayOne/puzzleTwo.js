const reader = require("../dataParser.js");
const data = reader.parseTxt("./data.txt");
const dataAsNumbers = reader.convertArrayToNumberType(data);

const calculateMeasurementIncreases = {
  countIncreases: (data) => {
    let numberOfIncreases = 0;

    data.forEach((currentNumber, i) => {
      const twoNumbersBehind = data[i - 2];
      const previousNumber = data[i - 1];
      const nextNumber = data[i + 1];

      if (previousNumber && nextNumber && twoNumbersBehind) {
        const currentSum = previousNumber + currentNumber + nextNumber;
        const previousSum = twoNumbersBehind + previousNumber + currentNumber;

        // if the current sum of three numbers is greater than the previous, there has been an increase
        if (currentSum > previousSum) {
          numberOfIncreases += 1;
        }
      }
    });
    return numberOfIncreases;
  },
};

const main = () => {
  const answer = calculateMeasurementIncreases.countIncreases(dataAsNumbers);
  return answer;
};

console.log(main());
