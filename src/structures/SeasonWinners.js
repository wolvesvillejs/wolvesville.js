'use strict';

const Base = require('./Base');
const SeasonWinner = require('./SeasonWinner');

/**
 * Represents the ranked hall of fame for a season.
 * @extends {Base}
 */
class SeasonWinners extends Base {
  constructor(client, data) {
    super(client);

    /**
     * Season number
     * @type {number}
     */
    this.seasonNumber = data.seasonNumber;

    /**
     * Top players for this season
     * @type {SeasonWinner[]}
     */
    this.winners = data.winners.map(w => new SeasonWinner(client, w));
  }
}

module.exports = SeasonWinners;
