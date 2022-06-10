const net = require('net');
const portOverlay = 3001;
const fs = require('fs');

const client = new net.Socket();

const subscriptions = fs.readFileSync('./subscriptions.txt', 'utf8');
let x = Math.floor((Math.random() * 100000) + 1);

let file = fs.writeFileSync('./'+ x +'.txt', '');

client.connect(portOverlay, 'localhost', function() {
    client.write('subscriber ' + subscriptions);
});

client.on('data', function(data) {
    console.log(data.toString());
    fs.appendFileSync('./'+ x +'.txt', data.toString());
    }
);
