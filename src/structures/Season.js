'use strict';

const Base = require('./Base');

/**
 * Represents a ranked season.
 * @extends {Base}
 */
class Season extends Base {
  constructor(client, data) {
    super(client);

    /**
     * Season id
     * @type {string}
     */
    this.id = data.id;

    /**
     * Season number
     * @type {number}
     */
    this.number = data.number;

    /**
     * Season start timestamp
     * @type {number}
     */
    this.startTimestamp = new Date(data.startTime).getTime();

    /**
     * Season end timestamp
     * @type {number}
     */
    this.endTimestamp = new Date(data.endTime).getTime();

    /**
     * Whether the season has finished
     * @type {boolean}
     */
    this.finished = data.finished;
  }
}

module.exports = Season;
