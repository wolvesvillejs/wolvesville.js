'use strict';

const ActiveClanQuest = require('./ActiveClanQuest');
const ClanQuest = require('./ClanQuest');
const Routes = require('../util/Routes');

/**
 * Represents an available clan quest.
 * @extends {ClanQuest}
 */
class AvailableClanQuest extends ClanQuest {
  constructor(client, data, clan) {
    super(client, data);

    Object.defineProperty(this, 'clan', { value: clan });
  }

  /**
   * Claim this quest.
   * <warn>Using this method will spend clan gold/gems!</warn>
   * @returns {Promise<ActiveClanQuest>}
   */
  async claim() {
    const response = await this.client.rest.post(Routes.CLANS_QUESTS_CLAIM(this.clan.id), {
      data: {
        questId: this.id,
      },
    });
    if (response.code === 404) throw new Error('QUEST_CANNOT_BE_CLAIMED');
    return new ActiveClanQuest(this.client, response, this.clan);
  }
}

module.exports = AvailableClanQuest;
