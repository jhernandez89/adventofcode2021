const reader = require("../dataParser.js");
const data = reader.parseTxt("./data.txt")[0];

const laternFish = {
  parseData: (data) => {
    // map items to object where weight indicates how many fish are in that iteration.
    return data.split(",").map((item) => {
      return {
        weight: 1,
        days: Number(item),
      };
    });
  },
  populateFish: (setOfFish, daysToIterate) => {
    for (let i = 0; i < daysToIterate; i++) {
      const newFishToAdd = [];
      let weight = 0;
      for (let j = 0; j < setOfFish.length; j++) {
        if (setOfFish[j].days === 0) {
          // if fish is resetting record it's weight for the new spawning fish
          setOfFish[j].days = 6;
          weight = weight + setOfFish[j].weight;
        } else {
          setOfFish[j].days = setOfFish[j].days - 1;
        }
      }
      if (weight > 0) {
        // set weight equal to how many new fish spawn on current day
        setOfFish.push({
          weight,
          days: 8,
        });
      }
    }
    return setOfFish;
  },
  calculateValue: (list) => {
    let value = 0;
    list.forEach((item) => {
      value = value + item.weight;
    });
    return value;
  },
};

const main = () => {
  const { parseData, populateFish, calculateValue } = laternFish;
  const dataParsed = parseData(data);
  const arrayOfFish = populateFish(dataParsed, 256);
  const finalValue = calculateValue(arrayOfFish);

  return finalValue;
};

console.log(main());
