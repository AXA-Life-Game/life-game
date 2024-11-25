import csvToJson from "convert-csv-to-json";
import fs from "fs";

let json = csvToJson
  .indexHeader(0)
  .fieldDelimiter(",")
  .getJsonFromCsv("./dataset.csv");

fs.writeFile("./dataset.json", JSON.stringify(json, null, 2), (err) => {
  if (err) {
    console.error("Error saving the model:", err);
  } else {
    console.log("Dataset saved:", json.length, "entries");
  }
});
