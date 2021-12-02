const reader = require("../dataParser.js");
const data = reader.parseTxt("./data.txt");

const calcualteSubPosition = {
  getXAndYPositions: (positionArray) => {
    let x = 0;
    let y = 0;
    let aim = 0;
    positionArray.forEach((position) => {
      const splitByWordAndNumber = position.split(" ");
      const word = splitByWordAndNumber[0];
      const num = Number(splitByWordAndNumber[1]);

      if (word === "forward") {
        x += num;
        y += aim * num;
      }
      if (word === "down") {
        aim += num;
      }
      if (word === "up") {
        aim -= num;
      }
    });
    return x * y;
  },
};

const main = () => {
  const answer = calcualteSubPosition.getXAndYPositions(data);
  return answer;
};

console.log(main());
