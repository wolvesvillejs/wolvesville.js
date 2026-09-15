'use strict';

const Base = require('./Base');
const EventReward = require('./EventReward');

/**
 * Represents an in-game event.
 * @extends {Base}
 */
class Event extends Base {
  constructor(client, data) {
    super(client);

    /**
     * Event id
     * @type {string}
     */
    this.id = data.id;

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
     * Event rewards
     * @type {EventReward[]}
     */
    this.rewards = data.rewards.map(reward => new EventReward(client, reward));

    /**
     * Count of epic role card upgrade icons
     * @type {string}
     */
    this.roleCardUpgradeIconsCountEpic = data.roleCardUpgradeIconsCountEpic;

    /**
     * Count of legendary role card upgrade icons
     * @type {string}
     */
    this.roleCardUpgradeIconsCountLegendary = data.roleCardUpgradeIconsCountLegendary;

    /**
     * Count of mythical role card upgrade icons
     * @type {string}
     */
    this.roleCardUpgradeIconsCountMythical = data.roleCardUpgradeIconsCountMythical;

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

module.exports = Event;
