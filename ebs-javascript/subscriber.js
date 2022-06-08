const net = require('net');
const portOverlay = 3001;
const fs = require('fs');

const client = new net.Socket();

const subscriptions = fs.readFileSync('./subscriptions.txt', 'utf8');

let file = fs.writeFileSync('./recievedPublications.txt', '');

client.connect(portOverlay, 'localhost', function() {
    client.write('subscriber ' + subscriptions);
});

client.on('data', function(data) {
    console.log(data.toString());
    fs.appendFileSync('./recievedPublications.txt', data.toString());
    }
);
