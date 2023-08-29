/** @format */

const fs = require("fs");

fs.readFile("./usersInfo.json", "utf8", (err, data) => {
  if (err) {
    console.error("Error reading JSON file:", err);
    return;
  }

  const usersInfo = JSON.parse(data);
  console.log(usersInfo.length);

  for (let i = 0; i < usersInfo.length; i++) {
    console.log(usersInfo[i]);
  }
});
