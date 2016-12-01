
const http = require('http');
const express = require('express');
const WSS = require('ws').Server;

const app = express().use(express.static('public'));
const server = http.createServer(app);
server.listen(8080, '127.0.0.1');

const wss = new WSS({ port: 8081 });
wss.on('connection', socket => {
  console.log('Opened Connection 🎉');

  const json = JSON.stringify({ message: 'Gotcha' });
  socket.send(json);
  console.log('Sent: ' + json);

  socket.on('message', message => {
    console.log('Received: ' + message);

    wss.clients.forEach(client => {
      const json = JSON.stringify({ message: 'Something changed' });
      client.send(json);
      console.log('Sent: ' + json);
    });
  });

  socket.on('close', () => {
    console.log('Closed Connection 😱');
  });

});

const broadcast = () => {
  const json = JSON.stringify({
    message: 'Hello hello!'
  });

  wss.clients.forEach(client => {
    client.send(json);
    console.log('Sent: ' + json);
  });
}
setInterval(broadcast, 3000);
