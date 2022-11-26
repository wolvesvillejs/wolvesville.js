'use strict';

const ClanQuest = require('./ClanQuest');
const Routes = require('../util/Routes');

/**
 * Represents an achieved clan quest.
 * @extends {ClanQuest}
 */
class AvailableClanQuest extends ClanQuest {
  constructor(client, data) {
    super(client, data);

    Object.defineProperty(this, 'clan', { value: data });
  }

  /**
   * Claim this quest.
   * <warn>Using this method will spend clan gold/gems!</warn>
   * @returns {void}
   */
  async claim() {
    const response = await this.client.rest.post(Routes.CLANS_QUESTS_CLAIM(this.clan.id), {
      data: {
        questId: this.id,
      },
    });
    if (response === 404) throw new Error('QUEST_CANNOT_BE_CLAIMED');
  }
}

module.exports = AvailableClanQuest;
