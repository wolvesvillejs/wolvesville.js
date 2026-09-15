'use strict';

const Base = require('./Base');
const CalendarReward = require('./CalendarReward');

/**
 * Represents a calendar.
 * @extends {Base}
 */
class Calendar extends Base {
  constructor(client, data) {
    super(client);

    /**
     * Calendar id
     * @type {string}
     */
    this.id = data.id;

    this._patch(data);
  }

  _patch(data) {
    if ('startTime' in data) {
      /**
       * Calendar start timestamp
       * @type {?number}
       */
      this.startTimestamp = new Date(data.startTime).getTime();
    } else {
      this.startTimestamp ??= null;
    }

    if ('imageBaseName' in data) {
      /**
       * Calendar image base name
       * @type {?string}
       */
      this.imageBaseName = data.imageBaseName;
    } else {
      this.imageBaseName ??= null;
    }

    if ('backgroundImagePrimaryColor' in data) {
      /**
       * Calendar background image primary color
       * @type {?string}
       */
      this.backgroundImagePrimaryColor = data.backgroundImagePrimaryColor;
    } else {
      this.backgroundImagePrimaryColor ??= null;
    }

    if ('rewards' in data) {
      /**
       * Calendar daily rewards
       * @type {CalendarReward[]}
       */
      this.rewards = data.rewards.map(r => new CalendarReward(this.client, r));
    } else {
      this.rewards ??= null;
    }

    if ('giftReward' in data) {
      /**
       * Calendar gift reward
       * @type {?CalendarReward}
       */
      this.giftReward = data.giftReward ? new CalendarReward(this.client, data.giftReward) : null;
    } else {
      this.giftReward ??= null;
    }

    if ('textColor' in data) {
      /**
       * Calendar text color
       * @type {?string}
       */
      this.textColor = data.textColor;
    } else {
      this.textColor ??= null;
    }

    if ('textBackgroundColor' in data) {
      /**
       * Calendar text background color
       * @type {?string}
       */
      this.textBackgroundColor = data.textBackgroundColor;
    } else {
      this.textBackgroundColor ??= null;
    }

    if ('iconUrl' in data) {
      /**
       * Calendar icon URL
       * @type {?string}
       */
      this.iconURL = data.iconUrl;
    } else {
      this.iconURL ??= null;
    }

    if ('backgroundImageUrl' in data) {
      /**
       * Calendar background image URL
       * @type {?string}
       */
      this.backgroundImageURL = data.backgroundImageUrl;
    } else {
      this.backgroundImageURL ??= null;
    }

    if ('limited' in data) {
      /**
       * Whether the calendar is a limited-time calendar
       * @type {?boolean}
       */
      this.limited = data.limited;
    } else {
      this.limited ??= null;
    }

    if ('title' in data) {
      /**
       * Calendar title
       * @type {?string}
       */
      this.title = data.title;
    } else {
      this.title ??= null;
    }

    if ('description' in data) {
      /**
       * Calendar description
       * @type {?string}
       */
      this.description = data.description;
    } else {
      this.description ??= null;
    }
  }
}

module.exports = Calendar;
