// const socket = new WebSocket(`wss://still-lowlands-27315.herokuapp.com`);
const socket = new WebSocket(`ws://localhost:8081/`);

const chatContainerEl = document.getElementById('chatContainer');
const textareaEl = document.getElementById('message');
const sendEl = document.getElementById('send');
const transcriptEl = document.getElementById('transcript');
const toggleChatEl = document.getElementById('toggleChat');

socket.onopen = event => {
  const data = {
    message: 'Opened connection 🎉',
    className: 'connected'
  }
  log(data);
}

socket.onerror = event => {
  log('Error: ' + JSON.stringify(event));
}

socket.onmessage = event => {
  const { data } = event;
  const msgData = JSON.parse(data);
  logMessage(msgData);
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
  const json = JSON.stringify({ message });
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

const log = function(data) {
  const { message, className } = data;
  let li = document.createElement('li');
  li.innerHTML = message;
  li.className = className;
  transcriptEl.insertBefore(li, transcriptEl.firstChild);
}

const logMessage = function(msgData) {
  console.log(msgData);
  const { message, time } = msgData;
  const html =
    `<date-time>${time}</date-time>
     <message-text>${message}</message-text>`;

  const li = document.createElement('li');
  li.innerHTML = html;

  // let li = document.createElement('li');
  // let span = document.createElement('span');
  // li.innerHTML = msgData.message;
  // span.innerHTML = msgData.time;

  // li.insertBefore(span, li.firstChild);
  transcriptEl.insertBefore(li, transcriptEl.firstChild);
}

window.addEventListener('beforeunload', function() {
  socket.close();
});
