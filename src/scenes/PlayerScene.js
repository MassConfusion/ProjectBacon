import Phaser from 'phaser';

import Player from '../sprites/Player';

import { GUI } from 'dat.gui/build/dat.gui.js';

export default class PlayerScene extends Phaser.Scene {

  constructor() {
    super( { key: 'PlayerScene' });

    this.player = null;
    if (__DEV__ === 'true') {
      this.dat_gui = new GUI();
    }
  }

  create() {
    let player_size = 20;
    this.grid = this.add.image(0, 0, 'grid');
    const map_width = this.grid.width;
    const map_height = this.grid.height;
    this.grid.x = map_width / 2;
    this.grid.y = map_height / 2;
    this.socket = this.game.config.socket;
    this.player = new Player({
      scene: this,
      key: 'player',
      x: player_size + Math.floor(Math.random() * (map_width - player_size * 2)),
      y: player_size + Math.floor(Math.random() * (map_height - player_size * 2)),
      map_bounds: {
        tl_x: 0 + player_size,
        tl_y: 0 + player_size,
        br_x: map_width - player_size,
        br_y: map_height - player_size
      },
      controlled: false
    });
    this.player.scaleX = 5;
    this.player.scaleY = 5;
    this.cameras.main.setBounds(0, 0, map_width, map_height);
    this.cameras.main.startFollow(this.player);
    if (__DEV__ === 'true') {
      let guiPlayer = this.dat_gui.addFolder('Player');
      guiPlayer.add(this.player, 'x', 0, map_width).listen();
      guiPlayer.add(this.player, 'y', 0, map_height).listen();
      guiPlayer.open();
    }
  }

  update() {
    this.player.update();
  }
}