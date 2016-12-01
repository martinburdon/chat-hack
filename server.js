
const http = require('http');
const express = require('express');
const WSS = require('ws').Server;
const app = express().use(express.static('public'));
const port = process.env.PORT || 8080;
const server = http.createServer(app);

server.listen(port);

const wss = new WSS({server});

wss.on('connection', socket => {
  const json = JSON.stringify({ message: 'Server connected' });
  socket.send(json);

  // When message received from client
  socket.on('message', messageData => {
    wss.clients.forEach(client => {
      // Send message to each client
      client.send(messageData);
    });
  });

  socket.on('close', () => {
    // console.log('Closed Connection 😱');
  });

});

const broadcast = () => {
  const json = JSON.stringify({
    message: 'Hello hello!'
  });

  wss.clients.forEach(client => {
    client.send(json);
    // console.log('Sent: ' + json);
  });
}
// setInterval(broadcast, 3000);
