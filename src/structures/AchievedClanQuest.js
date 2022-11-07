'use strict';

const ClanQuest = require('./ClanQuest');
const ClanQuestParticipant = require('./ClanQuestParticipant');

/**
 * Represents an achieved clan quest.
 * @extends {ClanQuest}
 */
class AchievedClanQuest extends ClanQuest {
  constructor(client, data) {
    super(client, data.quest);

    /**
     * Quest participants
     * @type {ClanQuestParticipant[]}
     */
    this.participants = data.participants.map(participant => new ClanQuestParticipant(client, participant));

    /**
     * Quest xp
     * @type {number}
     */
    this.xp = data.xp;

    /**
     * Achieved tiers
     * @type {number}
     */
    this.achievedTiers = data.tier;

    /**
     * Quest end timestamp
     * @type {number}
     */
    this.endTimestamp = new Date(data.endTime).getTime();
  }
}

module.exports = AchievedClanQuest;
