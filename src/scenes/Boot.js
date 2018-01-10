import Phaser from 'phaser';
import character from '../assets/images/character.png';

export default class BootScene extends Phaser.Scene {

  constructor() {
    super({ key: 'BootScene' });

    if (__DEV__) {
      console.log('BootScene created!');
    }
  }

  preload() {
    this.load.spritesheet('player', character, {frameWidth: 16, frameHeight: 32});
  }

  create() {
    this.scene.start('PlayerScene');
  }
}
