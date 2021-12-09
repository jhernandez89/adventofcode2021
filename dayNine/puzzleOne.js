const reader = require("../dataParser.js");
const data = reader.parseTxt("./data.txt");
const dataAsNumbers = reader.convertArrayToNumberType(data);

const lowestPoints = {
  formatData: (data) => {
    return data.map((item) => {
      return item.split("").map(Number);
    });
  },
  findLowestPoints: (data) => {
    const arrayOfLowestPoints = [];
    for (let rowIndex = 0; rowIndex < data.length; rowIndex++) {
      const row = data[rowIndex];
      for (let columnIndex = 0; columnIndex < row.length; columnIndex++) {
        const number = row[columnIndex];

        // get the values of numbers above, below, left and right.
        // if a number doesn't exist, set it to 10 as the highest a number will go is 9, so 10 will always be larger
        const topNumber =
          typeof data[rowIndex - 1] !== "undefined"
            ? data[rowIndex - 1][columnIndex]
            : 10;
        const bottomNumber =
          typeof data[rowIndex + 1] !== "undefined"
            ? data[rowIndex + 1][columnIndex]
            : 10;
        const leftNumber =
          typeof row[columnIndex - 1] !== "undefined"
            ? row[columnIndex - 1]
            : 10;
        const rightNumber =
          typeof row[columnIndex + 1] !== "undefined"
            ? row[columnIndex + 1]
            : 10;

        // if numbers above, below, left, and right are larger than the current number, this number is considered a low point
        if (
          number < topNumber &&
          number < bottomNumber &&
          number < leftNumber &&
          number < rightNumber
        ) {
          // risk level is cacluated as number + 1
          arrayOfLowestPoints.push(number + 1);
        }
      }
    }
    return arrayOfLowestPoints;
  },
  addUpNumbers: (numbersAsArray) => {
    let count = 0;
    numbersAsArray.forEach((number) => {
      count = count + number;
    });
    return count;
  },
};

const main = () => {
  const { findLowestPoints, formatData, addUpNumbers } = lowestPoints;
  const dataFormatted = formatData(data);
  const arrayOfLowestPoints = findLowestPoints(dataFormatted);
  const finalCount = addUpNumbers(arrayOfLowestPoints);
  return finalCount;
};

console.log(main());
