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
     * Role icon id
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

    if ('image' in data) {
      Object.defineProperty(this, '_cdn', {
        image: data.image,
      });
    }
  }
}

module.exports = RoleIcon;
