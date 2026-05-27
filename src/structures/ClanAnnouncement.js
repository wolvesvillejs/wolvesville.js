'use strict';

const Base = require('./Base');

/**
 * Represents a clan announcement (PublicClanAnnouncement).
 * @extends {Base}
 */
class ClanAnnouncement extends Base {
  constructor(client, data) {
    super(client);

    /**
     * Announcement ID
     * @type {string}
     */
    this.id = data.id;

    /**
     * Announcement content
     * @type {string}
     */
    this.content = data.content;

    /**
     * Username of the player who posted the announcement
     * @type {string}
     */
    this.author = data.author;

    /**
     * Player ID of the author
     * @type {string}
     */
    this.authorId = data.authorId;

    /**
     * Bot player ID of the author (if posted by a bot)
     * @type {?string}
     */
    this.botAuthorId = data.playerBotAuthorId ?? null;

    /**
     * Announcement creation timestamp
     * @type {number}
     */
    this.createdTimestamp = new Date(data.timestamp).getTime();

    /**
     * Timestamp of the last edit, or null if not edited
     * @type {?number}
     */
    this.editedTimestamp = data.editTimestamp ? new Date(data.editTimestamp).getTime() : null;

    /**
     * Username of the player who last edited the announcement
     * @type {?string}
     */
    this.editAuthor = data.editAuthor ?? null;

    /**
     * Player ID of the last editor
     * @type {?string}
     */
    this.editAuthorId = data.editAuthorId ?? null;
  }

  /**
   * Whether the announcement has been edited
   * @type {boolean}
   * @readonly
   */
  get edited() {
    return this.editedTimestamp !== null;
  }
}

module.exports = ClanAnnouncement;
