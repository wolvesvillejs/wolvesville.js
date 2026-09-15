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
     * Game mode identifier
     * @type {string}
     */
    this.name = data.gameMode;

    /**
     * Game mode display name
     * @type {?string}
     */
    this.gameModeName = data.gameModeName ?? null;

    /**
     * Game mode description
     * @type {?string}
     */
    this.description = data.description ?? null;

    /**
     * Game mode languages
     * @type {string[]}
     */
    this.languages = data.languages;

    /**
     * Minimum wins required to unlock this game mode
     * @type {number}
     */
    this.minWinRequirement = data.minWinRequirement;

    /**
     * Font Awesome icon identifier
     * @type {?string}
     */
    this.fontAwesomeIcon = data.fontAwesomeIcon ?? null;

    /**
     * Role rotations
     * @type {RoleRotation[]}
     */
    this.roleRotations = data.roleRotations.map(roleRotation => new RoleRotation(client, roleRotation.roleRotation));
  }
}

module.exports = GameMode;
