'use strict';

const Base = require('./Base');

/**
 * Represents a player's participation summary for an event.
 * @extends {Base}
 */
class PlayerEventSummary extends Base {
  constructor(client, data) {
    super(client);

    /**
     * Event id
     * @type {string}
     */
    this.eventId = data.eventId;

    /**
     * Event name
     * @type {string}
     */
    this.name = data.name;

    /**
     * Event icon URL
     * @type {string}
     */
    this.iconURL = data.iconUrl;

    /**
     * Event promo image URL
     * @type {string}
     */
    this.promoURL = data.promoUrl;

    /**
     * Event start timestamp
     * @type {number}
     */
    this.startTimestamp = new Date(data.startTime).getTime();

    /**
     * Event end timestamp
     * @type {number}
     */
    this.endTimestamp = new Date(data.endTime).getTime();

    /**
     * Total reward count of the event
     * @type {number}
     */
    this.totalRewards = data.totalRewards;

    /**
     * Reward count acquired by the player
     * @type {number}
     */
    this.acquiredRewards = data.acquiredRewards;

    /**
     * Event background color
     * @type {string}
     */
    this.backgroundColor = data.eventBackgroundColor;

    /**
     * Event text color
     * @type {string}
     */
    this.textColor = data.eventTextColor;
  }
}

module.exports = PlayerEventSummary;
