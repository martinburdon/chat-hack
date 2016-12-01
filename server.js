var WSS = require('ws').Server;

// Start the server
var wss = new WSS({ port: 8081 });

// When a connection is established
wss.on('connection', socket => {
  console.log('Opened connection');

  // Send data back to the client
  var json = JSON.stringify({ message: 'Gotcha' });
  socket.send(json);

  // When data is received
  socket.on('message', message => {
    console.log(`Received ${message}`);
  });

  // The connection is closed
  socket.on('close', () => {
    console.log('Closed connection');
  });
})

// Every 3 secs broadcase "{ message: Hello hello! }" to all connected clients
var broadcast = () => {
  var json = JSON.stringify({
    message: 'Hello hello'
  });

  // wss.clients is an array of all connected clients
  wss.clients.forEach(function each(client) {
    client.send(json);
    console.log(`Sent: ${json}`);
  })
}

setInterval(broadcast, 3000);
