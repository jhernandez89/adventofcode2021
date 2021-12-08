const reader = require("../dataParser.js");
const data = reader.parseTxt("./data.txt");

const decodeNumbers = {
  formatData: (input) => {
    return input.map((item) => {
      const itemSplit = item.split(" | ");

      // sort all strings alphabetically to make sure all occurances of a number are in the same order
      return {
        signalPatterns: itemSplit[0]
          .split(" ")
          .map((item) => item.split("").sort().join("")),
        outputValues: itemSplit[1]
          .split(" ")
          .map((item) => item.split("").sort().join("")),
      };
    });
  },
  associateNumbers: (data) => {
    data.forEach((arrayItem, i) => {
      const { outputValues, signalPatterns } = arrayItem;
      [...signalPatterns, ...outputValues].forEach((stringItem) => {
        const L = stringItem.length;
        // the following numbers are numbers with a unique length
        if (L === 2) {
          if (!arrayItem.one) {
            arrayItem[stringItem] = 1;
            arrayItem.oneKeyed = {};
            stringItem
              .split("")
              .forEach((item) => (arrayItem.oneKeyed[item] = true));
          }
        }
        if (L === 3) {
          if (!arrayItem.seven) {
            arrayItem[stringItem] = 7;
            arrayItem.sevenKeyed = {};
            // key items by letters so they can be quickly referenced later
            stringItem
              .split("")
              .forEach((item) => (arrayItem.sevenKeyed[item] = true));
          }
        }
        if (L === 4) {
          if (!arrayItem.four) {
            arrayItem[stringItem] = 4;
            arrayItem.fourKeyed = {};
            // key items by letters so they can be quickly referenced later
            stringItem
              .split("")
              .forEach((item) => (arrayItem.fourKeyed[item] = true));
          }
        }
        if (L === 7) {
          if (!arrayItem.eight) {
            arrayItem[stringItem] = 8;
            arrayItem.eightKeyed = {};
            // key items by letters so they can be quickly referenced later
            stringItem
              .split("")
              .forEach((item) => (arrayItem.eightKeyed[item] = true));
          }
        }
        // the following numbers share numbers with each other, so record the shared values
        if (L === 5) {
          if (!arrayItem.twoThreeFive) arrayItem.twoThreeFive = {};
          if (!arrayItem.twoThreeFive[stringItem])
            arrayItem.twoThreeFive[stringItem] = true;
        }
        if (L === 6) {
          if (!arrayItem.zeroSixNine) arrayItem.zeroSixNine = {};
          if (!arrayItem.zeroSixNine[stringItem])
            arrayItem.zeroSixNine[stringItem] = true;
        }
      });
    });
    return data;
  },
  determineUnknowns: (singleNumbersAssociated) => {
    singleNumbersAssociated.forEach((arrayItem) => {
      const {
        zeroSixNine,
        twoThreeFive,
        oneKeyed,
        fourKeyed,
        sevenKeyed,
        eightKeyed,
      } = arrayItem;
      for (const [key, value] of Object.entries(twoThreeFive)) {
        const keySplit = key.split("");

        // numbers can be determined by their commonality with known numbers
        let matchWithOne = 0;
        let matchWithFour = 0;
        let matchWithSeven = 0;
        keySplit.forEach((letter) => {
          if (oneKeyed[letter]) matchWithOne++;
          if (fourKeyed[letter]) matchWithFour++;
          if (sevenKeyed[letter]) matchWithSeven++;
        });
        if (!arrayItem[key]) {
          // in numbers with a letter length of 5, only 3 matches sides with 1 twice
          if (matchWithOne === 2) {
            arrayItem[key] = 3;
            // 5 matches with 4 3 times and does NOT match with one 2 times
          } else if (matchWithFour === 3) {
            arrayItem[key] = 5;
            // if none of the conditions are true, it's 2
          } else {
            arrayItem[key] = 2;
          }
        }
      }

      for (const [key, value] of Object.entries(zeroSixNine)) {
        const keySplit = key.split("");
        let matchWithOne = 0;
        let matchWithFour = 0;
        let matchWithSeven = 0;
        keySplit.forEach((letter) => {
          if (oneKeyed[letter]) matchWithOne++;
          if (fourKeyed[letter]) matchWithFour++;
          if (sevenKeyed[letter]) matchWithSeven++;
        });
        if (!arrayItem[key]) {
          // only 9 matches sides with 4, 4 times
          if (matchWithFour === 4) {
            arrayItem[key] = 9;
            // out of 0 and 6, 0 only matches with 2, 2 times
          } else if (matchWithOne === 2) {
            arrayItem[key] = 0;
            // if none of the above conditions are true, it's 6
          } else {
            arrayItem[key] = 6;
          }
        }
      }
    });
    return singleNumbersAssociated;
  },
  calculateFinalValue: (allKeys) => {
    let finalValue = 0;
    allKeys.forEach((item) => {
      let currentValue = "";
      const { outputValues } = item;
      // put numbers together as string and then convert that string to a number to get the row's current value
      outputValues.forEach((outputValue) => {
        currentValue += item[outputValue];
      });
      finalValue = finalValue + Number(currentValue);
    });
    return finalValue;
  },
};

const main = () => {
  const {
    associateNumbers,
    formatData,
    determineUnknowns,
    calculateFinalValue,
  } = decodeNumbers;
  const dataFormatted = formatData(data);
  const singleNumbersAssociated = associateNumbers(dataFormatted);
  const allKeys = determineUnknowns(singleNumbersAssociated);
  const finalValue = calculateFinalValue(allKeys);
  return finalValue;
};

console.log(main());
