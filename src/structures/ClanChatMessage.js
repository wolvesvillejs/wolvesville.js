const Base = require('./Base');
const ClanChatMessageAuthor = require('./ClanChatMessageAuthor');

/**
 * Clan chat message.
 * @extends {Base}
 */
class ClanChatMessage extends Base {
  constructor(client, data) {
    super(client);

    /**
     * Message author.
     * @type {ClanChatMessageAuthor}
     */
    this.author = new ClanChatMessageAuthor(client, {
      id: data.playerId
    });

    /**
     * Message content.
     * @type {string}
     */
    this.content = data.msg;

    /**
     * Message created timestamp.
     * @type {string}
     */
    this.createdTimestamp = data.date;

    /**
     * Is a system message.
     * @type {boolean}
     */
    this.system = data.isSystem;
  }
}

module.exports = ClanChatMessage;
