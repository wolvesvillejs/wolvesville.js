'use strict';

const BaseManager = require('./BaseManager');
const ClanChatMessage = require('../structures/ClanChatMessage');
const Routes = require('../util/Routes');

/**
 * Manages API methods for chat.
 * @extends {BaseManager}
 */
class ClanChatManager extends BaseManager {
  constructor(client, data) {
    super(client);

    Object.defineProperty(this, 'clan', { value: data });
  }

  /**
   * Fetch chat messages.
   * @param {number} timestamp Timestamp of messages around
   * @returns {Promise<ClanChatMessage[]>}
   */
  async fetch(timestamp) {
    if (timestamp) {
      const date = new Date(timestamp);
      if (isNaN(timestamp) || timestamp !== date.getTime()) throw new Error('INVALID_TIMESTAMP');
      timestamp = date.toISOString();
    }

    const response = await this.client.rest.get(Routes.CLANS_CHAT(this.clan.id), { query: { oldest: timestamp } });
    return response.map(message => new ClanChatMessage(this.client, message));
  }

  /**
   * Send chat message.
   * @param {string} content Message content
   */
  async send(content) {
    if (typeof content !== 'string') throw new Error('MESSAGE_CONTENT_MUST_BE_A_STRING');
    await this.client.rest.post(Routes.CLANS_CHAT(this.clan.id), {
      data: {
        message: content,
      },
    });
  }

  /**
   * Fetch announcements.
   * @returns {Promise<ClanChatMessage[]>}
   */
  async fetchAnnouncements() {
    const response = await this.client.rest.get(Routes.CLANS_ANNOUNCEMENTS(this.clan.id));
    return response.map(announcement => new ClanChatMessage(this.client, announcement));
  }

  /**
   * Send announcement message.
   * @param {string} content Announcement content
   */
  async sendAnnouncement(content) {
    if (typeof content !== 'string') throw new Error('MESSAGE_CONTENT_MUST_BE_A_STRING');
    await this.client.rest.post(Routes.CLANS_ANNOUNCEMENTS(this.clan.id), {
      data: {
        message: content,
      },
    });
  }
}

module.exports = ClanChatManager;
