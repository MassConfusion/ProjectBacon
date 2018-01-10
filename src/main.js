import Phaser from 'phaser';
import BootScene from './scenes/Boot';
import PlayerScene from './scenes/examples/PlayerScene';
import Chat from './chat';

import './main.scss';
import 'jquery';

const config = {
  type: Phaser.AUTO,
  parent: 'content',
  width: 800,
  height: 600,
  scene: [
    BootScene,
    PlayerScene
  ]
};

const login = $('#login');
const chat = $('#chat');
const game = $('#game');
game.hide();
chat.hide();
login.show();

$('#startButton').on('click', () => {
  login.hide();
  chat.show();
  game.show();
  new Chat($('#userNameInput').val());
  new Phaser.Game(config);
});
