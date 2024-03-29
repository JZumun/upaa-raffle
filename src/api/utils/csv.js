const parse = require("csv-parse/lib/sync");
const { normalize } = require("./student-number");

function toTitleCase(str) {
  return str.replace(/\w\S*/g, function(txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

module.exports.read = buffer => {
  const rawData = parse(buffer.toString(), {
    columns: true,
    skip_empty_lines: true
  });
  const idKey = Object.keys(rawData[0]).filter(key =>
    key.includes("STUDENT NUMBER")
  )[0];
  return rawData.map(datum => ({
    id: normalize(datum[idKey]),
    name: toTitleCase(
      `${datum["FIRST NAME"]} ${datum["MIDDLE NAME"]} ${datum["LAST NAME"]}`
    )
  }));
};
