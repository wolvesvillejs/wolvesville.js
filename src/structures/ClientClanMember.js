const ClanMember = require('./ClanMember');
const { getAuthenticationHeaders } = require('../util/Headers');
const fetch = require('node-fetch');

/**
 * Represents a client clan member.
 * @extends {ClanMember}
 */
class ClientClanMember extends ClanMember {
  constructor(client, data) {
    super(client, data);

    /**
     * Member join message.
     * @type {?string}
     */
    this.joinMessage = data.joinMessage || null;

    /**
     * Does the member participate in clan quests.
     * @type {boolean}
     */
    this.questParticipant = data.participateInClanQuests;
  }
}

module.exports = ClientClanMember;
