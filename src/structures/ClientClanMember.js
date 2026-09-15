'use strict';

const ClanMember = require('./ClanMember');

/**
 * Represents a client clan member.
 * @extends {ClanMember}
 */
class ClientClanMember extends ClanMember {
  constructor(client, data) {
    super(client, data);

    /**
     * Whether the member participate in clan quests
     * @type {boolean}
     */
    this.questParticipant = data.participateInClanQuests;

    /**
     * Member join message
     * @type {?string}
     */
    this.joinMessage = data.joinMessage ?? null;

    if (data.xpDurations) {
      /**
       * Xp the member brought to the clan by period
       * @type {?ClanMemberCollectingDurations}
       */
      this.xpDurations = {
        week: data.xpDurations.week ?? null,
        month: data.xpDurations.month ?? null,
        year: data.xpDurations.year ?? null,
        allTime: data.xpDurations.allTime ?? null,
      };
    } else {
      this.xpDurations = null;
    }

    if (data.donated) {
      /**
       * Amounts donated by the member by period
       * @type {?{gold: ClanMemberCollectingDurations, gems: ClanMemberCollectingDurations}}
       */
      this.donated = {
        gold: {
          week: data.donated.gold?.week ?? null,
          month: data.donated.gold?.month ?? null,
          year: data.donated.gold?.year ?? null,
          allTime: data.donated.gold?.allTime ?? null,
        },
        gems: {
          week: data.donated.gems?.week ?? null,
          month: data.donated.gems?.month ?? null,
          year: data.donated.gems?.year ?? null,
          allTime: data.donated.gems?.allTime ?? null,
        },
      };
    } else {
      this.donated = null;
    }

    /**
     * Count of gold quests the member participated in
     * @type {?number}
     */
    this.goldQuests = data.goldQuests ?? null;

    /**
     * Count of gem quests the member participated in
     * @type {?number}
     */
    this.gemQuests = data.gemQuests ?? null;
  }
}

/**
 * Amounts collected over different time periods.
 * @typedef {Object} ClanMemberCollectingDurations
 * @property {?number} week Amount collected this week
 * @property {?number} month Amount collected this month
 * @property {?number} year Amount collected this year
 * @property {?number} allTime Amount collected all time
 */

module.exports = ClientClanMember;
