import io from 'socket.io-client';

export default class Chat {

  constructor(nick) {
    this.nick = nick;
    this.socket = io({query: `nick=${nick}`});
    this.chatInput = $('#chat-input');
    this.chatBox = $('#chat-box');

    if (__DEV__) console.log(`nick: ${nick}`);

    this.socket.on('pong', (socket) => {
      if (__DEV__) console.log(`pong: ${socket}`);
    });

    this.socket.on('serverMessage', (data) => {
      this.addMessage(data.nick, data.message);
    });

    this.chatInput.on('keypress', (key) => {
      key = key.which || key.keyCode;

      if (key === 13) {
        const message = this.chatInput.val();

        if (message !== '') {
          this.socket.emit('userMessage', {nick: this.nick, message: message});
          this.addMessage(this.nick, message);
          this.chatInput.val('');
        }
      }
    });
  }

  addMessage(nick, message) {
    this.chatBox.append($(`<li><span class="chat-nicks">${nick}</span>: ${message}</li>`));
    this.chatBox.scrollTop(this.chatBox.prop('scrollHeight'));
  }
}
