
const http = require('http');
const express = require('express');
const WSS = require('ws').Server;
const app = express().use(express.static('public'));
const port = process.env.PORT || 8080;

var app = express().use(express.static('public'));
var server = http.createServer(app);
server.listen(port);

var wss = new WSS({server: server});
wss.on('connection', socket => {
  const json = JSON.stringify({ message: 'Server connected' });
  socket.send(json);

  // When message received from client
  socket.on('message', data => {
    const { message } = data;
    wss.clients.forEach(client => {
      // Send message to each client
      client.send(message);
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
