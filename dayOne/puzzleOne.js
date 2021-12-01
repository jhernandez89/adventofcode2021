const reader = require("../dataParser.js");
const data = reader.parseTxt("./data.txt");
const dataAsNumbers = reader.convertArrayToNumberType(data);

const calculateMeasurementIncreases = {
  countIncreases: (data) => {
    let numberOfIncreases = 0;
    data.forEach((number, i) => {
      const previousNumber = data[i - 1];

      // if the current number is larger than the previous value an increase occurred
      const curretNumBiggerThanPrev = number > previousNumber;
      if (previousNumber && curretNumBiggerThanPrev) {
        numberOfIncreases += 1;
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
