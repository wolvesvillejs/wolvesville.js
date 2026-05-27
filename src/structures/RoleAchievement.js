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
     * @type {?string}
     */
    this.roleId = data.roleId ?? null;

    /**
     * Role icon id
     * @type {?string}
     */
    this.roleIconId = data.roleIconId ?? null;

    /**
     * Achievement level
     * @type {?number}
     */
    this.level = data.level ?? null;

    /**
     * Current points
     * @type {?number}
     */
    this.points = data.points ?? null;

    /**
     * Points required for next level
     * @type {?number}
     */
    this.pointsNextLevel = data.pointsNextLevel ?? null;

    /**
     * Achievement category
     * @type {?string}
     */
    this.category = data.category ?? null;
  }
}

module.exports = RoleAchievement;
