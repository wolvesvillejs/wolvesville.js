const Base = require('./Base');
const ClanQuest = require('./ClanQuest');
const ClanQuestParticipant = require('./ClanQuestParticipant');

/**
 * Represents a an active clan quest.
 * @extends {ClanQuest}
 */
class ActiveClanQuest extends ClanQuest {
  constructor(client, data) {
    super(client, data.quest);

    /**
     * Is quest tier completed.
     * @type {boolean}
     */
    this.tierCompleted = data.tierFinished;

    /**
     * Clan tier.
     * @type {boolean}
     */
    this.tier = data.tier + 1;

    /**
     * Quest xp.
     * @type {number}
     */
    this.xp = data.xp;

    /**
     * Required xp per quest tier.
     * @type {number}
     */
    this.requiredXp = data.xpPerReward;

    /**
     * Quest tier start timestamp.
     * @type {string}
     */
    this.tierStartTimestamp = data.tierStartTime;

    /**
     * Quest tier end timestamp.
     * @type {string}
     */
    this.tierEndTimestamp = data.tierEndTime;

    /**
     * Quest participants.
     * @type {Array<ClanQuestParticipant>}
     */
    this.participants = data.participants.map(participant => new ClanQuestParticipant(client, participant));

    /**
     * Is quest duration extension claimed.
     * @type {boolean}
     */
    this.durationExtensionClaimed = data.claimedTime;
  }

  /**
   * Quest total xp.
   * @type {number}
   * @readonly
   */
  get totalXp() {
    return Object.values(this.participants).reduce((a, v) => a.xp + v.xp);
  }

  /**
   * Quest tier xp.
   * @type {number}
   * @readonly
   */
  get tierXp() {
    return this.xp % this.requiredXp;
  }

}

module.exports = ActiveClanQuest;
