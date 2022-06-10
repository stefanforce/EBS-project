const fs = require("fs");
const tool = require("./tool");

const file = fs.readFileSync("./subscriptions.txt", "utf8");

console.log(tool.parseSub(file));
