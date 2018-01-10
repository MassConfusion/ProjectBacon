import io from 'socket.io-client';

export default class Chat {
    constructor(nick) {
        this.nick = nick;
        this.socket = io({query: `nick=${nick}`});

        if (__DEV__) console.log(`nick: ${nick}`);

        this.socket.on('pong', (socket) => {
            if (__DEV__) console.log(`pong: ${socket}`);
        });

        this.socket.on('serverMessage', (data) => {
            this.addMessage(data.nick, data.message);
        });

        this.chatInput = $('#chatInput');
        this.chatBox = $('#chatBox');

        this.chatInput.on('keypress', (key) => {
            key = key.which || key.keyCode;
            if (key === 13) {
                this.socket.emit('userMessage', {nick: this.nick, message: this.chatInput.val()});
                this.addMessage(this.nick, this.chatInput.val());
                this.chatInput.val('');
            }
        });
    }

    addMessage(nick, message) {
        this.chatBox.append($(`<li>${nick}: ${message}</li>`));
    }
}
