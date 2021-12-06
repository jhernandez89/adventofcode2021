const reader = require("../dataParser.js");
const data = reader.parseTxt("./data.txt");

const overlapCount = {};

const lines = {
  // format data
  formatData: (data) => {
    const dataSplitByXAndY = data.map((item) => {
      item = item.split(" -> ");
      return [item[0].split(","), item[1].split(",")];
    });
    return dataSplitByXAndY;
  },
  calculateOverlap: (dataFormatted) => {
    dataFormatted.forEach((xAndY, index) => {
      // get the x and y values for the beginning and end of the input
      let beginningX = Number(xAndY[0][0]);
      let beginningY = Number(xAndY[0][1]);
      let endX = Number(xAndY[1][0]);
      let endY = Number(xAndY[1][1]);

      // only get straight lines (lines that are x1 = x2 or y1 = y2)
      if (beginningX === endX) {
        if (beginningY > endY) {
          while (beginningY >= endY) {
            const key = `${beginningX},${endY}`;
            //record the key as an object with the x and y value as the key
            if (typeof overlapCount[key] === "undefined") {
              overlapCount[key] = 0;
            } else {
              overlapCount[key]++;
            }
            endY += 1;
          }
          return;
        } else {
          while (beginningY <= endY) {
            const key = `${beginningX},${beginningY}`;
            //record the key as an object with the x and y value as the key

            if (typeof overlapCount[key] === "undefined") {
              overlapCount[key] = 0;
            } else {
              overlapCount[key]++;
            }
            beginningY += 1;
          }
          return;
        }
      } else if (beginningY === endY) {
        if (beginningX > endX) {
          while (beginningX >= endX) {
            const key = `${endX},${endY}`;
            //record the key as an object with the x and y value as the key

            if (typeof overlapCount[key] === "undefined") {
              overlapCount[key] = 0;
            } else {
              overlapCount[key]++;
            }
            endX += 1;
          }
          return;
        } else {
          while (beginningX <= endX) {
            const key = `${beginningX},${beginningY}`;
            //record the key as an object with the x and y value as the key

            if (typeof overlapCount[key] === "undefined") {
              overlapCount[key] = 0;
            } else {
              overlapCount[key]++;
            }
            beginningX += 1;
          }
          return;
        }
      }
    });
    return overlapCount;
  },
  calculateOccurances: (overlapData) => {
    // count all instances of overlap (where occurances is greater than 0)
    let count = 0;
    for (const key in overlapData) {
      if (overlapData[key] > 0) {
        count += 1;
      }
    }
    return count;
  },
};

const main = () => {
  const { formatData, calculateOverlap, calculateOccurances } = lines;
  const dataFormatted = formatData(data);
  const overlapData = calculateOverlap(dataFormatted);
  const count = calculateOccurances(overlapData);

  return count;
};

const answer = main();

console.log(answer);
