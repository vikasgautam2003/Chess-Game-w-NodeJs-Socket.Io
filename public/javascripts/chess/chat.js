// public/Javscripts/Chess-Files/chat.js
import { socket } from './socket.js';

export function setupChat() {
  const input = document.getElementById('chat-input');
  const btn   = document.getElementById('send-chat');
  const box   = document.getElementById('chat-messages');

  function send() {
    const msg = input.value.trim();
    if (!msg) return;
    socket.emit('chatMessage', { message: msg });
    input.value = '';
  }

  btn.onclick = send;
  input.addEventListener('keypress', e => e.key === 'Enter' && send());

  // this will be called from index.js via onChat callback
}

export function appendChatMessage({ username, message }) {
  const box = document.getElementById('chat-messages');
  const d = document.createElement('div');
  d.textContent = `${username}: ${message}`;
  box.appendChild(d);
  box.scrollTop = box.scrollHeight;
}
