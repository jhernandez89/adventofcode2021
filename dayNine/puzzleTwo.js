const reader = require("../dataParser.js");
const data = reader.parseTxt("./data.txt");
const dataAsNumbers = reader.convertArrayToNumberType(data);

const lowestPoints = {
  formatData: (data) => {
    return data.map((item) => {
      return item.split("").map(Number);
    });
  },
  returnValue: (data, x, y) => {
    return typeof data[y] !== "undefined" && typeof data[y][x] !== "undefined"
      ? data[y][x]
      : 10;
  },
  checkForNumber: (objectToCheck, currentNumber, adjacentNumber, x, y) => {
    if (
      adjacentNumber > currentNumber &&
      adjacentNumber < 9 &&
      !objectToCheck[`${x},${y}`]
    ) {
      objectToCheck[`${x},${y}`] = {
        value: adjacentNumber,
        x,
        y,
        needsChecking: true,
      };
    }
  },
  determineBasin: (data, rowIndex, columnIndex, objectToCheck) => {
    const { returnValue, checkForNumber } = lowestPoints;
    let size = 1;
    while (
      Object.keys(objectToCheck).filter(
        (key) => objectToCheck[key].needsChecking === true
      ).length > 0
    ) {
      for (var key in objectToCheck) {
        const item = objectToCheck[key];
        if (item.needsChecking) {
          const topCoordinates = { x: item.x, y: item.y - 1 };
          const bottomCoordinates = { x: item.x, y: item.y + 1 };
          const leftCoordinates = { x: item.x - 1, y: item.y };
          const rightCoordinates = { x: item.x + 1, y: item.y };
          const topNumber = returnValue(
            data,
            topCoordinates.x,
            topCoordinates.y
          );
          const bottomNumber = returnValue(
            data,
            bottomCoordinates.x,
            bottomCoordinates.y
          );
          const leftNumber = returnValue(
            data,
            leftCoordinates.x,
            leftCoordinates.y
          );
          const rightNumber = returnValue(
            data,
            rightCoordinates.x,
            rightCoordinates.y
          );

          checkForNumber(
            objectToCheck,
            item.value,
            topNumber,
            topCoordinates.x,
            topCoordinates.y
          );
          checkForNumber(
            objectToCheck,
            item.value,
            bottomNumber,
            bottomCoordinates.x,
            bottomCoordinates.y
          );
          checkForNumber(
            objectToCheck,
            item.value,
            leftNumber,
            leftCoordinates.x,
            leftCoordinates.y
          );
          checkForNumber(
            objectToCheck,
            item.value,
            rightNumber,
            rightCoordinates.x,
            rightCoordinates.y
          );
          size = size + 1;
          item.needsChecking = false;
        }
      }
    }
    return size;
  },
  findLowestPoints: (data) => {
    const { returnValue } = lowestPoints;
    const arrayOfLowestBasins = [];
    for (let rowIndex = 0; rowIndex < data.length; rowIndex++) {
      const row = data[rowIndex];
      for (let columnIndex = 0; columnIndex < row.length; columnIndex++) {
        const number = row[columnIndex];

        // get the values of numbers above, below, left and right.
        // if a number doesn't exist, set it to 10 as the highest a number will go is 9, so 10 will always be larger
        const topCoordinates = { y: rowIndex - 1, x: columnIndex };
        const bottomCoordinates = { y: rowIndex + 1, x: columnIndex };
        const leftCoordinates = { y: rowIndex, x: columnIndex - 1 };
        const rightCoordinates = { y: rowIndex, x: columnIndex + 1 };
        const topNumber = returnValue(data, topCoordinates.x, topCoordinates.y);
        const bottomNumber = returnValue(
          data,
          bottomCoordinates.x,
          bottomCoordinates.y
        );
        const leftNumber = returnValue(
          data,
          leftCoordinates.x,
          leftCoordinates.y
        );

        const rightNumber = returnValue(
          data,
          rightCoordinates.x,
          rightCoordinates.y
        );

        // if numbers above, below, left, and right are larger than the current number, this number is considered a low point
        if (
          number < topNumber &&
          number < bottomNumber &&
          number < leftNumber &&
          number < rightNumber
        ) {
          let numbersToCheck = {};
          if (topNumber < 9)
            numbersToCheck[`${topCoordinates.x},${topCoordinates.y}`] = {
              value: topNumber,
              x: topCoordinates.x,
              y: topCoordinates.y,
              needsChecking: true,
            };
          if (bottomNumber < 9)
            numbersToCheck[`${bottomCoordinates.x},${bottomCoordinates.y}`] = {
              value: bottomNumber,
              x: bottomCoordinates.x,
              y: bottomCoordinates.y,
              needsChecking: true,
            };
          if (leftNumber < 9)
            numbersToCheck[`${leftCoordinates.x},${leftCoordinates.y}`] = {
              value: leftNumber,
              x: leftCoordinates.x,
              y: leftCoordinates.y,
              needsChecking: true,
            };
          if (rightNumber < 9)
            numbersToCheck[`${rightCoordinates.x},${rightCoordinates.y}`] = {
              value: rightNumber,
              x: rightCoordinates.x,
              y: rightCoordinates.y,
              needsChecking: true,
            };
          numbersToCheck[`${columnIndex},${rowIndex}`] = {
            value: number,
            x: columnIndex,
            y: rowIndex,
            needsChecking: false,
            orignal: true,
          };

          // risk level is cacluated as number + 1

          const size = lowestPoints.determineBasin(
            data,
            columnIndex,
            rowIndex,
            numbersToCheck
          );
          arrayOfLowestBasins.push(size);
          // if (numbersToCheck[originalKey]) console.log("break", size);
        }
      }
    }
    return arrayOfLowestBasins;
  },
  addUpNumbers: (arrayOfLowestBasins) => {
    let count = 0;
    arrayOfLowestBasins.forEach((number) => {
      count = count + number;
    });
    return count;
  },
  findAndAddThreeBiggestNumbers: (arrayOfPoints) => {
    const sortedDesc = arrayOfPoints.sort(function (a, b) {
      return b - a;
    });
    const answer = sortedDesc[0] * sortedDesc[1] * sortedDesc[2];
    return answer;
  },
};

const main = () => {
  const {
    findLowestPoints,
    formatData,
    addUpNumbers,
    findAndAddThreeBiggestNumbers,
  } = lowestPoints;
  const dataFormatted = formatData(data);
  const arrayOfLowestPoints = findLowestPoints(dataFormatted);
  const finalCount = findAndAddThreeBiggestNumbers(arrayOfLowestPoints);
  return finalCount;
};

console.log(main());
