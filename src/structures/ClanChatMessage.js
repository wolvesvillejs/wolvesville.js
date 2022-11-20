'use strict';

const Base = require('./Base');
const { ItemTypes } = require('../util/Constants');
const Player = require('./Player');

/**
 * Represents a clan chat message.
 * @extends {Base}
 */
class ClanChatMessage extends Base {
  constructor(client, data) {
    super(client);

    /**
     * Message author
     * @type {?Player}
     */
    this.author = !data.playerBotOwnerUsername
      ? new Player(client, {
          id: data.playerId,
        })
      : null;

    /**
     * Message author username
     * @type {?string}
     */
    this.username = data.playerBotOwnerUsername ?? null;

    /**
     * Message content
     * @type {?string}
     */
    this.content = data.msg ?? null;

    /**
     * Message emoji
     * @type {?Emoji}
     */
    this.emoji = client.items.resolve(data.emojiId, ItemTypes.EMOJI) ?? null;

    /**
     * Whether message is a system message
     * @type {boolean}
     */
    this.system = data.isSystem;

    /**
     * Message created timestamp
     * @type {number}
     */
    this.createdTimestamp = new Date(data.date).getTime();

    /**
     * Whether the author is a bot
     * @type {boolean}
     */
    this.bot = !!data.playerBotOwnerUsername;
  }
}

module.exports = ClanChatMessage;
