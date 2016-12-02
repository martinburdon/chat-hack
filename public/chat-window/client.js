const template = `
  <style>
    /* Container */
    .chat-container {
      width: 16rem;
      height: 20rem;
      background: #01579B;
      display: flex;
      flex-direction: column;
      position: absolute;
      right: 4rem;
      bottom: -17rem;
      transition: 0.3s bottom ease;
    }

    .chat-container.open {
      bottom: 0;
    }

    /* Toggle chat */
    .toggle-chat {
      background: #0277bd;
      padding: 0.2rem 1rem;
      color: #fff;
      border-radius: 0.2rem 0.2rem 0 0;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05rem;
      cursor: pointer;
      height: 3rem;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .toggle-chat:hover {
      background: #0288d1;
    }

    .toggle-chat svg {
      width: 2rem;
      height: 2rem;
      display: block;
      fill: #fff;
    }

    /* Transcript */
    .transcript {
      list-style: none;
      padding: 1rem 0;
      margin: 0;
      color: #fff;
      font-size: 0.9rem;
      text-align: left;
      height: 14rem;
      overflow-y: scroll;
      position: relative;
    }

    .transcript::after {
      content: '';
      background: -webkit-linear-gradient(top, rgba(255,255,255,0) 0%, #01579B 80%);
      height: 2rem;
      position: absolute;
      width: 100%;
      bottom: 0;
    }

    .transcript li {
      display: flex;
      flex-direction: column;
      margin: 0 1rem 0.5rem;
    }

    .my-msg {
      align-items: flex-start;
    }

    .not-my-msg {
      align-items: flex-end;
    }

    .my-msg message-text {
      background: #0277BD;
    }

    .not-my-msg message-text {
      background: #03A9F4;
    }

    date-time {
      font-size: 0.6rem;
      color: #039BE5;
      margin-bottom: 0.2rem;
    }

    message-text {
      border-radius: 10rem;
      padding: 0.5rem 1rem;
      font-size: 0.8rem;
    }

    .transcript .connected {
      background: #558B2F;
      color: #fff;
      padding: 0.2rem;
      text-align: center;
      margin: 0;
    }

    /* Form area */
    .form-area {
      display: flex;
      margin-top: auto;
      height: 3rem;
    }

    .form-area input {
      flex-grow: 1;
      padding: 0.2rem 1rem;
      font-size: 0.8rem;
      border: 0;
      border-left: 1px solid #e0e0e0;
    }

    .form-area button {
      background: #8bc34a;
      color: #fff;
      border: none;
      width: 3rem;
    }

    .form-area button svg {
      height: 2rem;
      width: 2rem;
      display: block;
      fill: #F1F8E9;
      margin: auto;
    }
  </style>

  <section id="chatContainer" class="chat-container">
    <header id="toggleChat" class="toggle-chat">
      <!-- <svg xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 50 62.5" x="0px" y="0px"><title>communication_tnp</title><path d="M27.25,7A35.73,35.73,0,0,0,9.83,11.37C4.05,14.72,1,19.43,1,25S4.08,35.26,9.7,38.55a11.73,11.73,0,0,1-7,6.51A1,1,0,0,0,3,47H3.44c2.11,0,10.73-.27,17.49-4.54a38.35,38.35,0,0,0,6.33.54C40.46,43,49,35.93,49,25S40.46,7,27.25,7Zm0,34a36.48,36.48,0,0,1-6.36-.57,1,1,0,0,0-.72.15C16,43.28,11,44.34,7.41,44.75a14.66,14.66,0,0,0,4.49-6.28,1,1,0,0,0-.46-1.24C7.59,35.16,3,31.35,3,25,3,14,17.18,9,27.25,9,36.8,9,47,13.2,47,25S36.8,41,27.25,41ZM37,25a2,2,0,1,1-2-2A2,2,0,0,1,37,25ZM27,25a2,2,0,1,1-2-2A2,2,0,0,1,27,25ZM17,25a2,2,0,1,1-2-2A2,2,0,0,1,17,25Z"/></svg> -->
      <svg xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 50 50" x="0px" y="0px"><title>communication_tnp</title><path d="M32.82,3.42C32.24,1.26,28.39,1,25,1s-7.24.3-7.82,2.46A18.66,18.66,0,0,0,5,21.42a22,22,0,0,0,2.6,10.4,1,1,0,0,0,.15.19L8,34.19a4.48,4.48,0,0,0,1.65,3,4.39,4.39,0,0,0,2.77,1l0.48,0a4.5,4.5,0,0,0,4-5l-0.73-7a4.48,4.48,0,0,0-1.65-3,4.38,4.38,0,0,0-3.25-1,4.47,4.47,0,0,0-3.79,3.18,20.23,20.23,0,0,1-.41-4,16.74,16.74,0,0,1,10.68-16c0.93,0.82,2.54.64,4.6,0.41A25.86,25.86,0,0,1,25,5.59a25.86,25.86,0,0,1,2.72.21A23.53,23.53,0,0,0,30.16,6a3.15,3.15,0,0,0,2.16-.61A16.74,16.74,0,0,1,43,21.42a20.23,20.23,0,0,1-.41,4,4.47,4.47,0,0,0-3.79-3.18,4.38,4.38,0,0,0-3.26,1,4.48,4.48,0,0,0-1.65,3l-0.73,7a4.5,4.5,0,0,0,2.56,4.54,34.79,34.79,0,0,1-7.52,6.14,2.12,2.12,0,0,0-2.27-.16l-1.86,1a2,2,0,0,0-1,1.25,1.93,1.93,0,0,0,.23,1.53,2.08,2.08,0,0,0,1.77,1,2.14,2.14,0,0,0,1-.26l1.86-1a2,2,0,0,0,1-1.25,2,2,0,0,0,0-.21,35.3,35.3,0,0,0,9-7.61,4.39,4.39,0,0,0,2.37-1,4.48,4.48,0,0,0,1.65-3L42.24,32a1,1,0,0,0,.16-0.22A22,22,0,0,0,45,21.42,18.66,18.66,0,0,0,32.82,3.42ZM11.42,24.26h0.26a2.41,2.41,0,0,1,1.52.54,2.49,2.49,0,0,1,.92,1.69l0.73,7a2.49,2.49,0,0,1-2.18,2.75,2.4,2.4,0,0,1-1.78-.53A2.5,2.5,0,0,1,10,34L9.24,27A2.49,2.49,0,0,1,11.42,24.26ZM40.76,27L40,34a2.5,2.5,0,0,1-.92,1.69,2.4,2.4,0,0,1-1.78.53,2.49,2.49,0,0,1-2.18-2.75l0.73-7a2.49,2.49,0,0,1,.92-1.69,2.41,2.41,0,0,1,1.52-.54h0.26A2.49,2.49,0,0,1,40.76,27Z"/></svg>
    </header>
    <ul id="transcript" class="transcript"></ul>
    <form class="form-area">
      <input id="message" placeholder="Write a message fool..." />
      <button id="send"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 24 24" style="enable-background:new 0 0 24 24;" xml:space="preserve"><g><path d="M2.663,10.914l7.424,2.999l2.998,7.424c0.07,0.173,0.237,0.286,0.423,0.287c0.001,0,0.002,0,0.003,0   c0.185,0,0.352-0.111,0.424-0.282l7.654-18.33c0.072-0.172,0.033-0.37-0.099-0.502c-0.132-0.132-0.331-0.17-0.502-0.099   l-18.33,7.653c-0.172,0.072-0.283,0.24-0.282,0.426C2.377,10.677,2.49,10.844,2.663,10.914z M20.31,3.689l-6.792,16.267   l-2.539-6.286l3.917-3.916c0.179-0.179,0.179-0.47,0-0.649c-0.179-0.179-0.47-0.179-0.649,0L10.33,13.02l-6.286-2.539L20.31,3.689z"/></g></svg></button>
    </form>
  </section>
`;

const socket = new WebSocket(`wss://still-lowlands-27315.herokuapp.com`);
// const socket = new WebSocket(`ws://localhost:8081/`);
const proto = Object.create(HTMLElement.prototype);

proto.createdCallback = function() {
  var test = this.createShadowRoot();

  test.innerHTML = template;

  const chatContainerEl = this.shadowRoot.querySelector('#chatContainer');
  const textareaEl = this.shadowRoot.querySelector('#message');
  const sendEl = this.shadowRoot.querySelector('#send');
  const transcriptEl = this.shadowRoot.querySelector('#transcript');
  const toggleChatEl = this.shadowRoot.querySelector('#toggleChat');

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
    log({ message: 'Closed connection 😱' });
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

    // Add message to own client
    logMessage({
      message,
      time: getDateTime(),
      className: 'my-msg'
    });
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
    if (className) li.className = className;
    transcriptEl.insertBefore(li, transcriptEl.firstChild);
  }

  const logMessage = function(msgData) {
    console.log(msgData);
    const { message, time, className } = msgData;
    const html =
      `<date-time>${time}</date-time>
       <message-text>${message}</message-text>`;

    const li = document.createElement('li');
    if (className) li.className = className;
    li.innerHTML = html;
    transcriptEl.insertBefore(li, transcriptEl.firstChild);
  }

  window.addEventListener('beforeunload', function() {
    socket.close();
  });

  const getDateTime = () => {
    let dateObject = new Date();
    let mins = dateObject.getMinutes();
    mins = mins < 10 ? `0${mins}` : mins;
    const time = `${dateObject.getHours()}:${mins}:${dateObject.getSeconds()}`;
    const date = `${dateObject.getDate()}/${dateObject.getMonth() + 1}/${dateObject.getFullYear() + 1}`;
    const fullTimeDate = `${time}    ${date}`;
    return fullTimeDate;
  }
}

var XComponent = document.registerElement('chat-window', {
  prototype: proto
});
