// Open a connection
const socket = new WebSocket('ws://localhost:8081/');

socket.onopen = event => {
  log('Opened connection 🎉');
  const json = JSON.stringify({ message: 'Hello' });

  // Send to the esr
  socket.send(json);
  log('Sent: ' + json);
}

socket.onerror = event => {
  log('Error: ' + JSON.stringify(event));
}

socket.onmessage = event => {
  log('Received: ' + event.data);
}

socket.onclose = event => {
  log('Closed connection 😱');
}

document.querySelector('#close').addEventListener('click', event => {
  socket.close();
  log('Closed connection 😱');
});

document.querySelector('#send').addEventListener('click', event => {
  const json = JSON.stringify({ message: 'Hey there' });
  socket.send(json);
  log('Sent: ' + json);
});

const log = function(text) {
  let li = document.createElement('li');
  li.innerHTML = text;
  document.getElementById('log').appendChild(li);
}

window.addEventListener('beforeunload', function() {
  socket.close();
});
