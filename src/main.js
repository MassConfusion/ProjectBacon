import Phaser from 'phaser';
import BootScene from './scenes/Boot';
import BootMenu from './scenes/BootMenu';
import PlayerScene from './scenes/examples/PlayerScene';
import MushroomScene from './scenes/examples/MushroomScene';

import './main.scss';

const config = {
  type: Phaser.AUTO,
  parent: 'content',
  width: 800,
  height: 600,
  scene: [
    BootScene,
    BootMenu,
    MushroomScene,
    PlayerScene
  ]
};

new Phaser.Game(config);
