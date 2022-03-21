const Base = require('./Base');
const ClanLogPlayer = require('./ClanLogPlayer');

/**
 * Represents a clan log.
 * @extends {Base}
 */
class ClanLog extends Base {
  constructor(client, data) {
    super(client);

    /**
     * Log action.
     * @type {string}
     */
    this.action = data.action;

    /**
     * Log creation timestamp.
     * @type {string}
     */
    this.creationTimestamp = data.creationTime;

    /**
     * Log target username.
     * @type {string}
     */
    this.target = new ClanLogPlayer(client, {
      username: data.playerUsername ? data.playerUsername : data.memberUsername
    });

    if(data.playerUsername) {
      /**
      * Log executor username.
      * @type {string}
      */
      this.executor = new ClanLogPlayer(client, {
        username: data.playerUsername ? data.memberUsername : data.playerUsername
      });
    }
  }
}

module.exports = ClanLog;
