import Phaser from 'phaser';
import character from '../assets/images/character.png';
import mushroom from '../assets/images/mushroom2.png';

export default class BootScene extends Phaser.Scene {

  constructor() {
    super({ key: 'BootScene' });

    if (__DEV__) {
      console.log('BootScene created!');
    }
  }

  preload() {
    this.load.spritesheet('player', character, {frameWidth: 16, frameHeight: 32});
    this.load.image('mushroom', mushroom);
  }

  create() {
    this.scene.start('BootMenu');
  }
}
