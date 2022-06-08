const net = require('net');

class Broker {
  constructor(port) {
    this.port = port;
    this.server = net.createServer(this.handleConnection);
  }

  listen() {
    this.server.listen(this.port);
  }

    handleConnection(socket) {

        socket.on('data', function(data) {
            console.log(data.toString());
        });
    }

}
