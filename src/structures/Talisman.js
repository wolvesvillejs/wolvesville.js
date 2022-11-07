'use strict';

const Base = require('./Base');

/**
 * Represents a talisman.
 * @extends {Base}
 */
class Talisman extends Base {
  constructor(client, data) {
    super(client);

    /**
     * Talisman id
     * @type {string}
     */
    this.id = data.id;

    this._patch(data);
  }

  _patch(data) {
    if ('roleId' in data) {
      /**
       * Talisman name
       * @type {?string}
       */
      this.name = data.roleId;
    } else {
      this.name ??= null;
    }

    if ('deprecated' in data) {
      /**
       * Whether talisman is deprecated
       * @type {?boolean}
       */
      this.deprecated = data.deprecated;
    } else {
      this.deprecated ??= null;
    }
  }
}

module.exports = Talisman;
