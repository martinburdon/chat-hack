// Open a connection
const socket = new WebSocket('ws://localhost:8081/');

socket.onopen = event => {
  log('Opened connection 🎉');
  const json = JSON.stringify({ message: 'Hello' });

  // Send to the esr
  socket.send(json);
  // log('Sent: ' + json);
}

socket.onerror = event => {
  log('Error: ' + JSON.stringify(event));
}

socket.onmessage = event => {
  let { data } = event;
  data = JSON.parse(data);
  log(data.message);
}

socket.onclose = event => {
  log('Closed connection 😱');
}

document.querySelector('#close').addEventListener('click', event => {
  socket.close();
});

document.querySelector('#send').addEventListener('click', event => {
  const message = document.getElementById('message').value;
  const json = JSON.stringify({
    // name, TODO
    // time, TODO
    message
  });
  socket.send(json);
});

const log = function(text) {
  let li = document.createElement('li');
  li.innerHTML = text;
  document.getElementById('log').appendChild(li);
}

window.addEventListener('beforeunload', function() {
  socket.close();
});
