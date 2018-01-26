import Phaser from 'phaser';

import Player from '../sprites/Player';

import { GUI } from 'dat.gui/build/dat.gui.js';

export default class PlayerScene extends Phaser.Scene {

  constructor() {
    super({ key: 'PlayerScene' });

    this.in_game = false;
    this.player = null;
    this.socket = window.socket;
    this.other_players = new Map();
    if (__DEV__ === 'true') {
      this.dat_gui = new GUI();
    }
  }

  createWorld() {
    this.player_size = 20;
    this.grid = this.add.image(0, 0, 'grid');
    this.grid.x = this.grid.width / 2;
    this.grid.y = this.grid.height / 2;
    this.map_bounds = {
      tl_x: 0 + this.player_size,
      tl_y: 0 + this.player_size,
      br_x: this.grid.width - this.player_size,
      br_y: this.grid.height - this.player_size
    };
    this.cameras.main.setBounds(0, 0, this.grid.width, this.grid.height);
    this.cameras.main.startFollow(this.player);
  }

  createPlayer() {
    console.log('createPlayer');
    this.player = new Player({
      scene: this,
      key: 'player',
      x: this.player_size + Math.floor(Math.random() * (this.grid.width - this.player_size * 2)),
      y: this.player_size + Math.floor(Math.random() * (this.grid.height - this.player_size * 2)),
      map_bounds: this.map_bounds,
      controlled: true
    });
    if (__DEV__ === 'true') {
      let guiPlayer = this.dat_gui.addFolder('Player');
      guiPlayer.add(this.player, 'x', 0, this.grid.width).listen();
      guiPlayer.add(this.player, 'y', 0, this.grid.height).listen();
      guiPlayer.open();
    }
    this.in_game = true;
    this.socket.emit('newPlayer', {x: this.player.x, y: this.player.y});
  }

  createRemotePlayer(data) {
    console.log('createRemotePlayer');
    this.other_players.set(data.id, new Player({
      scene: this,
      key: 'player',
      x: data.pos.x,
      y: data.pos.y,
      map_bounds: this.map_bounds,
      controlled: false
    }));
  }

  moveRemotePlayer(data) {
    let op = this.other_players.get(data.id);
    op.x = data.pos.x;
    op.y = data.pos.y;
  }

  removeRemotePlayer(data) {
    let op = this.other_players.get(data.id);
    op.destroy();
    this.other_players.delete(data.id);
  }

  create() {
    this.createWorld();
    this.createPlayer();
    this.socket.on('serverNewPlayer', (data) => this.createRemotePlayer(data));
    this.socket.on('serverMovePlayer', (data) => this.moveRemotePlayer(data));
    this.socket.on('serverRemovePlayer', (data) => this.removeRemotePlayer(data));
  }

  update() {
    if (this.in_game) {
      this.player.update();
      this.socket.emit('movePlayer', {x: this.player.x, y: this.player.y});
    }
  }
}
