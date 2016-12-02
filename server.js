const http = require('http');
const express = require('express');
const WSS = require('ws').Server;
const app = express().use(express.static('public'));
const port = process.env.PORT || 8080;
const server = http.createServer(app);

server.listen(port);

// Prod
const wss = new WSS({server});

// Local
// const wss = new WSS({ port: 8081 });

wss.on('connection', socket => {
  // Successful connection messge
  let connectedMessage = {
    message: 'Server connected',
    time: getDateTime(),
    className: 'system-msg'
  };
  connectedMessage = JSON.stringify(connectedMessage);
  socket.send(connectedMessage);

  // When new message received
  socket.on('message', messageDataString => {
    broadcast(messageDataString, socket);
  });

  // On connection close
  socket.on('close', () => {
    // console.log('Closed Connection 😱');
  });
});

const broadcast = (messageDataString, socket) => {
  let messageData = JSON.parse(messageDataString);
  messageData.time = getDateTime();
  messageData.className = 'not-my-msg';
  messageData = JSON.stringify(messageData);

  wss.clients.forEach(client => {
    // Send message to each client but not the sender
    if (client !== socket) client.send(messageData);
  });
}

const getDateTime = () => {
  let dateObject = new Date();
  let mins = dateObject.getMinutes();
  mins = mins < 10 ? `0${mins}` : mins;
  const time = `${dateObject.getHours()}:${mins}:${dateObject.getSeconds()}`;
  const date = `${dateObject.getDate()}/${dateObject.getMonth() + 1}/${dateObject.getFullYear() + 1}`;
  const fullTimeDate = `${time}    ${date}`;
  return fullTimeDate;
}
