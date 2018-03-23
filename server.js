const path = require('path');
const express = require('express');
const port = process.env.PORT || 5001;
const env = process.env.NODE_ENV || 'production';
const SocketIO = require('socket.io');
const http = require('http');
const app = express();

const server = http.createServer(app);

if (env === 'development') {
  const webpack = require('webpack');
  const config = require('./webpack.config.js');

  config.mode = 'development';
  const compiler = webpack(config);

  app.use(require('webpack-dev-middleware')(compiler, {
    contentBase: 'src',
    publicPath: '/',
    quiet: false,
    reload: true,
    stats: { colors: true }
  }));

  app.use(require('webpack-hot-middleware')(compiler, {
    reload: true
  }));
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
    nick: nick,
    x: 0,
    y: 0
  };
  users.set(socket.id, user);

  console.log(`connected: ${user.nick}`);

  socket.broadcast.emit('serverMessage', {nick: 'SERVER', message: `${user.nick} is connected`});

  socket.on('userMessage', (data) => {
    socket.broadcast.emit('serverMessage', data);
  });

  socket.on('disconnect', () => {
    console.log(`disconnected: ${users.get(socket.id).nick}`);
    socket.broadcast.emit('serverMessage', {nick: 'SERVER', message: `${users.get(socket.id).nick} is disconnected`});
    socket.broadcast.emit('serverRemovePlayer', {id: socket.id});
    users.delete(socket.id);
    socket.disconnect();
  });

  socket.on('newPlayer', (data) => {
    console.log(`newPlayer[${socket.id}]: ${JSON.stringify(data)}`);
    let user = users.get(socket.id);
    user.x = data.x;
    user.y = data.y;
    users.forEach((u) => {
      if (u.id != socket.id) {
        socket.emit('serverNewPlayer', {id: u.id, pos: {x: u.x, y: u.y}});
      }
    });
    socket.broadcast.emit('serverNewPlayer', {id: socket.id, pos: {x: data.x, y: data.y}});
  });

  socket.on('movePlayer', (data) => {
    let user = users.get(socket.id);
    user.x = data.x;
    user.y = data.y;
    socket.broadcast.emit('serverMovePlayer', {id: socket.id, pos: {x: data.x, y: data.y}});
  });
});

// Start the server.
server.listen(port, (err) => {

  if (err) {
    console.log(err);
  }

  console.info(`The server is listening on port ${port}. Env: ${env}.`);
});
