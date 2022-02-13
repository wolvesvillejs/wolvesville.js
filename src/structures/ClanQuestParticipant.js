const Base = require('./Base');

/**
 * Represents a quest participant.
 */
class ClanQuestParticipant extends Base {
  constructor(client, data) {
    super(client);

    /**
     * Participant id.
     * @type {string}
     */
    this.id = data.playerId;

    /**
     * Participant username.
     * @type {string}
     */
    this.username = data.username;

    /**
     * Xp the participant brought for the quest.
     * @type {number}
     */
    this.xp = data.xp;
  }


  /**
   * Fetch the participant.
   * @returns {Promise<Player|ClientPlayer>}
   */
  async fetch() {
    return await this.client.players.fetchById(this.id);
  }

}

module.exports = ClanQuestParticipant;
