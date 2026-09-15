'use strict';

const Base = require('./Base');
const RoleAchievement = require('./RoleAchievement');

/**
 * Represents a player's game statistics.
 * @extends {Base}
 */
class PlayerGameStats extends Base {
  constructor(client, data) {
    super(client);

    /**
     * Total wins
     * @type {number}
     */
    this.totalWinCount = data.totalWinCount;

    /**
     * Total losses
     * @type {number}
     */
    this.totalLoseCount = data.totalLoseCount;

    /**
     * Total ties
     * @type {number}
     */
    this.totalTieCount = data.totalTieCount;

    /**
     * Village wins
     * @type {number}
     */
    this.villageWinCount = data.villageWinCount;

    /**
     * Village losses
     * @type {number}
     */
    this.villageLoseCount = data.villageLoseCount;

    /**
     * Werewolf wins
     * @type {number}
     */
    this.werewolfWinCount = data.werewolfWinCount;

    /**
     * Werewolf losses
     * @type {number}
     */
    this.werewolfLoseCount = data.werewolfLoseCount;

    /**
     * Voting wins
     * @type {number}
     */
    this.votingWinCount = data.votingWinCount;

    /**
     * Voting losses
     * @type {number}
     */
    this.votingLoseCount = data.votingLoseCount;

    /**
     * Solo wins
     * @type {number}
     */
    this.soloWinCount = data.soloWinCount;

    /**
     * Solo losses
     * @type {number}
     */
    this.soloLoseCount = data.soloLoseCount;

    /**
     * Games exited by suicide
     * @type {number}
     */
    this.exitGameBySuicideCount = data.exitGameBySuicideCount;

    /**
     * Games exited after death
     * @type {number}
     */
    this.exitGameAfterDeathCount = data.exitGameAfterDeathCount;

    /**
     * Games survived
     * @type {number}
     */
    this.gamesSurvivedCount = data.gamesSurvivedCount;

    /**
     * Games killed
     * @type {number}
     */
    this.gamesKilledCount = data.gamesKilledCount;

    /**
     * Total play time in minutes
     * @type {number}
     */
    this.totalPlayTimeInMinutes = data.totalPlayTimeInMinutes;

    /**
     * Role achievements
     * @type {RoleAchievement[]}
     */
    this.achievements = data.achievements.map(a => new RoleAchievement(client, a));
  }

  /**
   * Total games played
   * @type {number}
   * @readonly
   */
  get gamesPlayedCount() {
    return this.totalWinCount + this.totalLoseCount + this.totalTieCount;
  }
}

module.exports = PlayerGameStats;
