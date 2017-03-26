var net = require('net');

                               // option here
var server = net.createServer({allowHalfOpen: true}, function(clientSock) {

var connected = false;    

var serverSock;

clientSock.on('data', function(clientData) {

    if (connected) {

        // Send future messages if is connected
        serverSocet.write(clientData);

    } else {

        var host = // get from data
        var port = // get from data

        if (clientData is a CONNECT request) {

            // Create a new socket to server
            if (!serverSock) {

                                             // Option here
                serverSock = new net.Socket({allowHalfOpen: true});

                serverSock.connect(port, host, function() {

                    // Don't need to forward hello message from client
                    // Connect method automatically sends it for you
                    //serverSock.write(clientData);

                    connected = true;

                    clientSock.write('HTTP/1.1 200 OK\r\n');
               });

               serverSock.on('data', function(serverData) {
                    clientSock.write(serverData);
               });
           }
      }
 });