import fs from "node:fs";

import { parse } from "csv-parse";

const filePath = new URL("../../text.csv", import.meta.url);

export async function pipeCSVFilesIntoDatabase(filePath) {
  const records = [];

  fs.createReadStream(filePath, "utf8")
  .pipe(parse({}))
  .on("data", (data) => records.push(data))
  .on("end", async () => {
    records.shift();

    records.forEach(record => {
      fetch("http://localhost:3333/tasks", {
        method: "POST",
        body: JSON.stringify({
          title: record[0],
          description: record[1],
        })
      })
      .then(() => {
        console.log("Everything was successfully saved!")
      })
      .catch(() => console.log("Something went wrong..."));
    });
  });
}

await pipeCSVFilesIntoDatabase(filePath);