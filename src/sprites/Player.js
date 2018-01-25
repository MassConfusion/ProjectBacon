import Phaser from 'phaser';

export default class Player extends Phaser.GameObjects.Sprite {
  constructor(config) {
    const { scene, x, y, key, map_bounds, controlled } = config;

    super(scene, x, y, key);
    this.scaleX = 5;
    this.scaleY = 5;
    const playerFrames = scene.anims.generateFrameNumbers(key);
    const animationConfig = {
      walkDown: {
        key: 'playerWalkDown',
        frames: playerFrames.slice(0, 4),
        frameRate: 6,
        repeat: -1
      },
      walkUp: {
        key: 'playerWalkUp',
        frames: playerFrames.slice(34, 38),
        frameRate: 6,
        repeat: -1
      },
      walkLeft: {
        key: 'playerWalkLeft',
        frames: playerFrames.slice(51, 55),
        frameRate: 6,
        repeat: -1
      },
      walkRight: {
        key: 'playerWalkRight',
        frames: playerFrames.slice(17, 21),
        frameRate: 6,
        repeat: -1
      }
    };

    scene.anims.create(animationConfig.walkDown);
    scene.anims.create(animationConfig.walkUp);
    scene.anims.create(animationConfig.walkLeft);
    scene.anims.create(animationConfig.walkRight);
    this.anims.load('playerWalkDown');
    this.anims.load('playerWalkUp');
    this.anims.load('playerWalkLeft');
    this.anims.load('playerWalkRight');

    // this.setInteractive();
    this.controlled = controlled;
    if (this.controlled) {
      this.downKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
      this.upKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
      this.leftKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
      this.rightKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    } else {
      this.pos = {x: 0, y: 0};
    }

    this.map_bounds = map_bounds;
    if (__DEV__ === 'true') console.log(this);

    config.scene.add.existing(this);
  }

  update() {
    if (this.controlled) {
      if (this.downKey.isDown) {
        this.y += 5;
        if (this.y >= this.map_bounds.br_y) this.y = this.map_bounds.br_y;
        this.anims.play('playerWalkDown', true);
      }
      if (this.upKey.isDown) {
        this.y -= 5;
        if (this.y <= this.map_bounds.tl_y) this.y = this.map_bounds.tl_y;
        this.anims.play('playerWalkUp', true);
      }
      if (this.leftKey.isDown) {
        this.x -= 5;
        if (this.x <= this.map_bounds.tl_x) this.x = this.map_bounds.tl_x;
        this.anims.play('playerWalkLeft', true);
      }
      if (this.rightKey.isDown) {
        this.x += 5;
        if (this.x >= this.map_bounds.br_x) this.x = this.map_bounds.br_x;
        this.anims.play('playerWalkRight', true);
      }

      if (this.downKey.isUp && this.upKey.isUp && this.leftKey.isUp && this.rightKey.isUp) {
        this.anims.stop();
      }
    }
  }
}
