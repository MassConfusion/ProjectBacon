import Phaser from 'phaser';
import BootScene from './scenes/Boot';
import PlayerScene from './scenes/examples/PlayerScene';
import Chat from './chat';

import 'jquery';
import 'bootstrap';

import 'bootstrap/dist/css/bootstrap.css';
import './main.scss';

/**
 * Phaser init configs.
 */
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


/**
 * Document ready.
 */
$(() => {
  const ui = {
    login: $('#login-wrapper'),
    chat: $('#chat-wrapper'),
    game: $('#game')
  };

  /**
   * Default states.
   */
  ui.game.hide();
  ui.chat.hide();
  ui.login.show();

  /**
   * Event listeners.
   */
  (() => {
    $('#username-input').on('keypress', (key) => {
      if ((key.which || key.keyCode) === 13) {
        $('#play-game-button').trigger('click');
      }
    });

    $('#play-game-button').on('click', () => {
      const username = $('#username-input');
      const alert = $('#login-input-alert');

      if (username.val() === '') {
        alert.html('Please fill in the username field.').show();
        return false;
      }

      if (username.val().length < username.attr('minLength') ||
          username.val().length > username.attr('maxLength') ||
          new RegExp(/\s/g).test(username.val())) {
        alert.html(
          `The username length must be between ${username.attr('minLength')} and ${username.attr('maxLength')} and ` +
          'cannot contain any space character.'
        ).show();
        return false;
      }

      ui.login.hide();
      ui.chat.show();
      ui.game.show();

      new Chat(username.val());
      new Phaser.Game(config);
    });
  })();
});
