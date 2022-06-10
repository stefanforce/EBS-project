const net = require("net");
const portOverlay = 3001;
const fs = require("fs");

const client = new net.Socket();

const file = fs.readFileSync("./publications.txt", "utf8");

client.connect(portOverlay, "localhost", function () {
  client.write("publisher " + file);
});
