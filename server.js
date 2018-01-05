const path = require('path');
const express = require('express');
const port = process.env.PORT || 5001;
const env = process.env.NODE_ENV || 'prod';
const app = express();

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

// Start the server.
app.listen(port, function(err) {

  if (err) {
    console.log(err);
  }

  console.info('==> The server is listening on port %s. Env: %s.', port, env);
});
