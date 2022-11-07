'use strict';

const Base = require('./Base');
const { Rarities } = require('../util/Constants');

/**
 * Represents a role icon.
 * @extends {Base}
 */
class RoleIcon extends Base {
  constructor(client, data) {
    super(client);

    /**
     * Profile icon id
     * @type {string}
     */
    this.id = data.id;

    this._patch(data);
  }

  _patch(data) {
    if ('roleId' in data) {
      /**
       * Role icon name
       * @type {?string}
       */
      this.name = data.roleId;
    } else {
      this.name ??= null;
    }

    if ('rarity' in data) {
      /**
       * Role icon rarity
       * @type {?string}
       */
      this.rarity = Rarities[data.rarity];
    } else {
      this.rarity ??= null;
    }

    Object.defineProperty(this, '_cdn', {
      image: data.image,
    });
  }
}

module.exports = RoleIcon;
