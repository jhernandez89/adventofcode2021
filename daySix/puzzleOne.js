const reader = require("../dataParser.js");
const data = reader.parseTxt("./data.txt");

const laternFish = {
  parseData: (data) => {
    return data.split(",").map((item) => {
      return Number(item);
      return {
        first: false,
        days: Number(item),
      };
    });
  },
  populateFish: (setOfFish, daysToIterate) => {
    for (let i = 0; i < daysToIterate; i++) {
      const newFishToAdd = [];
      for (let j = 0; j < setOfFish.length; j++) {
        if (setOfFish[j] === 0) {
          setOfFish[j] = 6;
          newFishToAdd.push(8);
        } else {
          setOfFish[j] = setOfFish[j] - 1;
        }
      }
      setOfFish = setOfFish.concat(newFishToAdd);
    }
    return setOfFish.length;
  },
};

const main = () => {
  const { parseData, populateFish } = laternFish;
  const dataParsed = parseData(data[0]);
  const numberOfFish = populateFish(dataParsed, 80);

  return numberOfFish;
};

console.log(main());
