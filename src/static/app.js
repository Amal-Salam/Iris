/* eslint-disable prettier/prettier */
const socket = io('http://localhost:4000');
const msgBox = document.getElementById('inputMessage');
const msgCont = document.getElementById('messages-container');
const email = document.getElementById('inputEmail');
const sendBtn = document.getElementById('buttonMessage');
const clearBtn = document.getElementById('clearChats');

// get messages from server
let messages = [];
function getMessages() {
  fetch('http://localhost:4000/api/chat')
    .then((response) => response.json())
    .then((data) => {
      messages.length = 0;
      messages.push(...data);
      // console.log("messages are:",data)
      loadData(messages);
      
    })
    .catch((error) => console.error(error));
}
getMessages();

// global send event function to prevent code duplication
function sendEvent() {
  // changed from parameters to calling directly,so that seems to have fixed the text not working issue.
  const emailValue = email.value.trim();
  const messageText = msgBox.value;
  // console.log('Sending message:', { email: emailValue, text: messageText });
  sendMessage({ email: emailValue, text: messageText });
  msgBox.value = '';
}

// send message when you press enter
msgBox.addEventListener('keydown', (e) => {
  if (e.keyCode !== 13) return;
  sendEvent(email, e);
});

// send message when user press button
sendBtn.addEventListener('click', sendEvent);

// clear all chats
clearBtn.addEventListener('click', () => {
  messages = [];
  loadData(messages);
 socket.emit('clearChats');
});

// display messages
function loadData(data) {
  let messages = '';
  data.forEach((message) => {
      messages += `<li class ='bg-success p-2 rounded mb-2 text-light'>
            <span class="fw-bolder">${message.email}:</span>
            ${message.text}
        </li>`;
  });
  msgCont.innerHTML = messages;

}

// for socket.io -emit sendMessage event
function sendMessage(message){
  socket.emit('sendMessage', message);
}

// listen to recMessage Event
socket.on('recMessage', (message) => {
  messages.push(message);
  loadData(messages);
});