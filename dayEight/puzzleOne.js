const reader = require("../dataParser.js");
const data = reader.parseTxt("./data.txt");

const decodeNumbers = {
  formatData: (input) => {
    return input.map((item) => {
      // split item by pattern values and output values
      const itemSplit = item.split(" | ");
      return {
        signalPatterns: itemSplit[0].split(" "),
        outputValues: itemSplit[1].split(" "),
      };
    });
  },
  numbers: (data, keys) => {
    let count = 0;
    data.forEach((item) => {
      const { outputValues } = item;
      outputValues.forEach((item) => {
        const L = item.length;
        // if any of these lengths occur, one of the desired numbers occurred
        if (L === 2 || L === 3 || L === 4 || L === 7) {
          count = count + 1;
        }
      });
    });
    return count;
  },
};

const main = () => {
  let keys = {};
  const { numbers, formatData } = decodeNumbers;
  const dataFormatted = formatData(data);
  const count = numbers(dataFormatted, keys);
  return count;
};

console.log(main());
