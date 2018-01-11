const path = require('path');
const express = require('express');
const port = process.env.PORT || 5001;
const env = process.env.NODE_ENV || 'prod';
const SocketIO = require('socket.io');
const http = require('http');
const app = express();

const server = http.createServer(app);

if (env === 'dev') {
  const webpack = require('webpack');
  const config = require('./webpack.dev.js');
  const compiler = webpack(config);

  app.use(require('webpack-dev-middleware')(compiler, {
    contentBase: 'src',
    publicPath: '/',
    quiet: false,
    reload: true,
    stats: { colors: true }
  }));

  app.use(require('webpack-hot-middleware')(compiler));
} else {
  // Define the folder that will be used for production.
  app.use(express.static(__dirname + '/dist'));

  // Routing.
  app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
  });
}

const io = new SocketIO(server);

const users = new Map();

io.on('connection', (socket) => {
  const nick = socket.handshake.query.nick;
  const user = {
    id: socket.id,
    nick: nick
  };

  console.log(`connected: ${user.nick}`);

  users.set(socket.id, user);
  socket.broadcast.emit('serverMessage', {nick: 'SERVER', message: `${user.nick} is connected`});

  socket.on('disconnect', () => {
    console.log(`disconnected: ${users.get(socket.id).nick}`);

    socket.broadcast.emit('serverMessage', {nick: 'SERVER', message: `${users.get(socket.id).nick} is disconnected`});
    users.delete(socket.id);
  });

  socket.on('userMessage', (data) => {
    socket.broadcast.emit('serverMessage', data);
  });
});

// Start the server.
server.listen(port, (err) => {

  if (err) {
    console.log(err);
  }

  console.info(`The server is listening on port ${port}. Env: ${env}.`);
});
