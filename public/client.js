const socket = new WebSocket(`wss://still-lowlands-27315.herokuapp.com`);

const chatContainerEl = document.getElementById('chatContainer');
const textareaEl = document.getElementById('message');
const sendEl = document.getElementById('send');
const transcriptEl = document.getElementById('transcript');
const toggleChatEl = document.getElementById('toggleChat');

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

// closeEl.addEventListener('click', event => {
//   socket.close();
// });

sendEl.addEventListener('click', event => {
  event.preventDefault();
  const message = textareaEl.value;
  const json = JSON.stringify({
    // name, TODO
    // time, TODO
    message
  });
  socket.send(json);
  textareaEl.value = '';
});

toggleChatEl.addEventListener('click', event => {
  if (chatContainerEl.classList.contains('open')) {
    chatContainerEl.classList.remove('open')
  } else {
    chatContainerEl.classList.add('open')
  }
});

const log = function(text) {
  let li = document.createElement('li');
  li.innerHTML = text;
  transcriptEl.insertBefore(li, transcriptEl.firstChild);
}

window.addEventListener('beforeunload', function() {
  socket.close();
});
