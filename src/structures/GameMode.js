'use strict';

const Base = require('./Base');
const RoleRotation = require('./RoleRotation');

/**
 * Represents a game mode.
 * @extends {Base}
 */
class GameMode extends Base {
  constructor(client, data) {
    super(client);

    /**
     * Game mode name
     * @type {string}
     */
    this.name = data.gameMode;

    this.languages = data.languages;

    this.roleRotations = data.roleRotations.map(roleRotation => new RoleRotation(client, roleRotation.roleRotation));
  }
}

module.exports = GameMode;
