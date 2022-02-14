const Base = require('./Base');

/**
 * Represents a gift.
 * @extends {Base}
 */
class Gift extends Base {
  constructor(client, data) {
    super(client);

    /**
     * Gift type.
     * @type {string}
     */
    this.type = data.description;

    /**
     * Gift pruchase timestamp.
     * @type {string}
     */
    this.purchaseTimestamp = data.purchaseTime;
  }
}

module.exports = Gift;
