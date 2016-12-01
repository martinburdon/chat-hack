// Open a connection
var socket = new WebSocket('ws://localhost:8081');

// When a connection is made
socket.onopen = () => {
  console.log('Opened connection');

  // Send data to the server
  var json = JSON.stringify({ message: 'Hello' });
  socket.send(json);
}

// When data is received
socket.onmessage = event => {
  console.log(event.data);
}

// Connection not made
socket.onerror = event => {
  console.log(event);
}

// A connection was closed
socket.onclose = (code, reason) => {
  console.log(code, reason);
}

// Close connection when the window is closed
window.addEventListener('beforeunload', () => {
  socket.close();
});
