import Phaser from 'phaser';
import character from '../assets/images/character.png';
import grid from '../assets/images/small_grid.jpg';
/*
 * import grid from '../assets/images/medium_grid.svg';
 * import grid from '../assets/images/large_grid.png';
 */

export default class BootScene extends Phaser.Scene {

  constructor() {
    super({ key: 'BootScene' });

    if (__DEV__ === 'true') {
      console.log('BootScene created!');
    }
  }

  preload() {
    this.load.spritesheet('player', character, {frameWidth: 16, frameHeight: 32});
    this.load.image('grid', grid);
  }

  create() {
    this.scene.start('PlayerScene');
  }
}
