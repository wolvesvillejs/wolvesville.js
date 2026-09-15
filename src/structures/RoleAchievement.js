'use strict';

const Base = require('./Base');

/**
 * Represents a role achievement entry.
 * @extends {Base}
 */
class RoleAchievement extends Base {
  constructor(client, data) {
    super(client);

    /**
     * Role id
     * @type {string}
     */
    this.roleId = data.roleId;

    /**
     * Role icon id
     * @type {?string}
     */
    this.roleIconId = data.roleIconId ?? null;

    /**
     * Achievement level
     * @type {number}
     */
    this.level = data.level;

    /**
     * Current points
     * @type {number}
     */
    this.points = data.points;

    /**
     * Points required for next level
     * @type {number}
     */
    this.pointsNextLevel = data.pointsNextLevel;

    /**
     * Achievement category
     * @type {string}
     */
    this.category = data.category;
  }
}

module.exports = RoleAchievement;
