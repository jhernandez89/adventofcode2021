var exports = (module.exports = {});

exports.parseTxt = function (file) {
  const fs = require("fs");
  const text = fs.readFileSync(file);
  const textFile = text.toString().split("\n");
  return textFile;
};

exports.convertArrayToNumberType = function (data) {
  return data.map((item) => Number(item));
};
