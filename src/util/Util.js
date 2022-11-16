'use strict';

/**
 * Contains various general-purpose utility methods.
 */
class Util {
  /**
   * Verify if the parameter is a valid UUID
   * @param {string} uuid UUID
   * @returns {boolean}
   */
  static isUUID(uuid) {
    const regex = /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i;
    return regex.test(uuid);
  }
}

module.exports = Util;
