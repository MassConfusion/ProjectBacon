import io from 'socket.io-client';
import 'jquery';

export default class Chat {
    constructor(nick) {
        this.nick = nick;
        this.socket = io({query: `nick=${nick}`});

        if (__DEV__)
            console.log('nick: '+nick);

        this.socket.on('pong', (socket) => {
            if (__DEV__)
                console.log('pong: '+ socket);
        });

        this.socket.on('serverMessage', (data) => {
            this.addMessage(data.nick, data.message);
        });

        this.chatInput = $('#chatInput').get(0);
        this.chatBox = $('#chatBox').get(0);

        this.chatInput.addEventListener('keypress', (key) => {
            key = key.which || key.keyCode;
            if (key === 13) {
                this.socket.emit('userMessage', {nick: this.nick, message: this.chatInput.value});
                this.addMessage(this.nick, this.chatInput.value);
                this.chatInput.value = '';
            }
        });
    }

    addMessage(nick, message) {
        let newline = document.createElement('li');
        newline.innerHTML = nick + ': ' + message;
        this.chatBox.appendChild(newline);
    }
}
