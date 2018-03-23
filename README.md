# Project Bacon

[![License](https://img.shields.io/badge/licence-Apache%202.0-brightgreen.svg?style=flat)](LICENSE)
[![Build Status](https://travis-ci.org/MassConfusion/ProjectBacon.svg?branch=master)](https://travis-ci.org/MassConfusion/ProjectBacon)

## Getting started
This project requires [node.js](https://nodejs.org/en/) v8.x.x or higher and [npm](https://www.npmjs.com) 5.x.x or higher to be able to work properly.

### Prerequisites
Do the following to install the `node.js` and `npm` via `nvm` (check for the latest [nvm here](https://github.com/creationix/nvm)):
```
# Install the nvm through curl.
$ curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.8/install.sh | bash

# Reload the .bashrc.
$ source ~/.bashrc

# Install the node.js v8 (or higher).
$ nvm install 8

# To start using the installed node.
$ nvm use 8
```

### Start the developer site
```
# Assumes that you are in the project root directory.

# Install the project dependencies.
$ npm install

# To run the livereload developer site.
$ npm start
```

### Build the project
```
# Assumes that you are in the project root directory.

# Install the project dependencies.
$ npm install

# To build the production.
$ npm run build

# Optional: To start the server
$ npm start:prod
```

### Run style checker
```
# To run the eslint.
$ npm run lint
```

### Run style autofix
```
# To run the eslint.
$ npm run lint-fix
```

## Extra
- [ES6 CheatSheet](http://es6-features.org)
- [Phaser 3 API](https://phaser.io/phaser3/api)
- [Phaser examples](http://labs.phaser.io/)
