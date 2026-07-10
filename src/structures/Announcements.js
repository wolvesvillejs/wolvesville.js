'use strict';

const Base = require('./Base');

/**
 * Represents the announcements response containing general announcements,
 * changelogs, and Discord events. Each entry is a raw DiscordMessage object.
 * @extends {Base}
 */
class Announcements extends Base {
  constructor(client, data) {
    super(client);

    /**
     * General announcements (DiscordMessage[])
     * @type {?Object[]}
     */
    this.announcements = data.announcements ?? null;

    /**
     * Changelog messages (DiscordMessage[])
     * @type {?Object[]}
     */
    this.changelogs = data.changelogs ?? null;

    /**
     * Discord event messages (DiscordMessage[])
     * @type {?Object[]}
     */
    this.discordEvents = data.discordEvents ?? null;
  }
}

module.exports = Announcements;
