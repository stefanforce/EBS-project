const net = require('net');
const portOverlay = 3001;

process.title = 'overlay';


const subscribers = [];

const server = net.createServer(function(socket) {
    console.log('Connected');
    socket.write('Hello, client! Love, Server.');

    socket.on('data', function(data) {
        let clientType = data.split(' ')[0]

        if (clientType === 'subscriber') {
            subscribers.push(socket);
        }

    });
})



server.listen(portOverlay, 'localhost');
