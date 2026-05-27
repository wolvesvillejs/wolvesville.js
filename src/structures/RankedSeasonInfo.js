'use strict';

const Base = require('./Base');
const PublicSeasonAward = require('./PublicSeasonAward');
const Season = require('./Season');

/**
 * Represents ranked season information.
 * @extends {Base}
 */
class RankedSeasonInfo extends Base {
  constructor(client, data) {
    super(client);

    /**
     * Current season details
     * @type {Season}
     */
    this.season = new Season(client, data.season);

    /**
     * Default starting skill
     * @type {number}
     */
    this.startSkillDefault = data.startSkillDefault;

    /**
     * Level 1 starting skill
     * @type {number}
     */
    this.startSkillLevel1 = data.startSkillLevel1;

    /**
     * Skill required for level 1 start
     * @type {number}
     */
    this.startSkillLevel1RequiredSkill = data.startSkillLevel1RequiredSkill;

    /**
     * Season award tiers
     * @type {PublicSeasonAward[]}
     */
    this.seasonAwards = data.seasonAwards.map(a => new PublicSeasonAward(client, a));

    /**
     * Gold cost per game
     * @type {number}
     */
    this.goldPricePerGame = data.goldPricePerGame;

    /**
     * Gold prize for winning as village
     * @type {number}
     */
    this.goldPrizeWinAsVillage = data.goldPrizeWinAsVillage;

    /**
     * Gold prize for winning as werewolf
     * @type {number}
     */
    this.goldPrizeWinAsWerewolf = data.goldPrizeWinAsWerewolf;

    /**
     * Gold prize for winning as voting role
     * @type {number}
     */
    this.goldPrizeWinAsVoting = data.goldPrizeWinAsVoting;

    /**
     * Gold prize for winning as solo role
     * @type {number}
     */
    this.goldPrizeWinAsSolo = data.goldPrizeWinAsSolo;
  }
}

module.exports = RankedSeasonInfo;
