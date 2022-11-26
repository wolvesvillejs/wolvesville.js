'use strict';

const ClanQuest = require('./ClanQuest');
const ClanQuestParticipant = require('./ClanQuestParticipant');
const Routes = require('../util/Routes');

/**
 * Represents an active clan quest.
 * @extends {ClanQuest}
 */
class ActiveClanQuest extends ClanQuest {
  constructor(client, data, clan) {
    super(client, data.quest);

    /**
     * Quest tier
     * @type {number}
     */
    this.tier = data.tier + 1;

    /**
     * Quest xp
     * @type {number}
     */
    this.xp = data.xp;

    /**
     * Quest tier start timestamp
     * @type {number}
     */
    this.tierStartTimestamp = new Date(data.tierStartTime).getTime();

    /**
     * Quest tier end timestamp
     * @type {number}
     */
    this.tierEndTimestamp = new Date(data.tierEndTime).getTime();

    /**
     * Whether quest tier completed
     * @type {boolean}
     */
    this.tierCompleted = data.tierFinished;

    /**
     * Quest participants
     * @type {ClanQuestParticipant[]}
     */
    this.participants = data.participants.map(participant => new ClanQuestParticipant(client, participant));

    /**
     * Required xp per quest tier
     * @type {number}
     */
    this.requiredXp = data.xpPerReward;

    /**
     * Whether quest duration extension is claimed
     * @type {boolean}
     */
    this.durationExtensionClaimed = data.claimedTime;

    Object.defineProperty(this, 'clan', { value: clan });
  }

  /**
   * Skip waiting time.
   * <warn>Using this method will spend clan gold!</warn>
   * @returns {void}
   */
  async skipWaitingTime() {
    const response = await this.client.rest.post(Routes.CLANS_QUESTS_ACTIVE_SKIP_WAITING_TIME(this.clan.id));
    if (response === 404) throw new Error('QUEST_TIME_CANNOT_BE_SKIPPED');
  }

  /**
   * Claim additional time.
   * <warn>Using this method will spend clan gold!</warn>
   * @returns {void}
   */
  async claimExtraTime() {
    const response = await this.client.rest.post(Routes.CLANS_QUESTS_ACTIVE_CLAIM_TIME(this.clan.id));
    if (response === 404) throw new Error('QUEST_EXTRA_TIME_CANNOT_BE_CLAIMED');
  }

  /**
   * Cancel the quest.
   * @returns {void}
   */
  async cancel() {
    const response = await this.client.rest.post(Routes.CLANS_QUESTS_ACTIVE_CANCEL(this.clan.id));
    if (response === 404) throw new Error('ACTIVE_QUEST_CANNOT_BE_CANCELED');
  }

  /**
   * Quest total xp
   * @type {number}
   * @readonly
   */
  get totalXp() {
    return Object.values(this.participants).reduce((a, v) => a.xp + v.xp);
  }

  /**
   * Quest tier xp
   * @type {number}
   * @readonly
   */
  get tierXp() {
    return this.xp % this.requiredXp;
  }
}

module.exports = ActiveClanQuest;
