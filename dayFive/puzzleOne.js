const reader = require("../dataParser.js");
const data = "./data.txt";
const lines = data.trim().split("\n");

let dict = {};
for (let line = 0; line < lines.length; line++) {
  const [x1, y1, x2, y2] = [
    ...lines[line].matchAll(/(\d+)\D+(\d+)\D+(\d+)\D+(\d+)/gi),
  ][0]
    .slice(1)
    .map((x) => +x);
  let yOpp = y1 === y2 ? 0 : y1 < y2 ? 1 : -1;
  let xOpp = x1 === x2 ? 0 : x1 < x2 ? 1 : -1;
  let x = x1;
  let y = y1;
  while (true) {
    dict[`${x}:${y}`] = dict[`${x}:${y}`] ?? 0;
    dict[`${x}:${y}`]++;
    if (y === y2 && x === x2) {
      break;
    }
    x += x !== x2 ? xOpp : 0;
    y += y !== y2 ? yOpp : 0;
  }
}

const result = Object.values(dict).filter((y) => y > 1).length;
