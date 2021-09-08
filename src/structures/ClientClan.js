const Clan = require('./Clan');
const ClanChatManager = require('../managers/ClanChatManager');
const { getAuthenticationHeaders, getAuthenticationHeadersContainsBody } = require('../util/Headers');
const fetch = require('node-fetch');

class ClientClan extends Clan {
  constructor(client, data) {
    super(client, data);
    this.goldCount = data.clan.gold;
    this.gemCount = data.clan.gems;

    this.chat = new ClanChatManager(client);
  }

  async leave() {
    await fetch(`https://api-core.wolvesville.com/clans/${this.id}/leave`, {
      method: 'POST',
      headers: getAuthenticationHeaders(this.client.token)
    });
  }

  async update(data) {

    if(data.length < 1) throw new Error('CLAN_DATA_MISSING');

    if(data.name || typeof data.name !== 'string' || data.name.length > 32) {
      throw new Error('INVALID_CLAN_NAME');
    }

    if(data.icon.name || data.icon.color && typeof data.icon.name !== 'string' ) {
      throw new Error('INVALID_CLAN_ICON');
    }

    if(data.joinType && !['PUBLIC', 'JOIN_BY_REQUEST', 'PRIVATE'].includes(data.joinType)) throw new Error('INVALID_JOIN_TYPE');

    const request = await fetch('https://api-core.wolvesville.com/clans/edit', {
      method: 'PUT',
      headers: getAuthenticationHeadersContainsBody(this.client.token),
      body: JSON.stringify({
        name: data.name || this.name,
        description: data.description || this.description,
        language: data.locale || this.locale,
        icon: data.icon?.name || this.icon.name,
        iconColor: data.icon?.color || this.icon.color,
        tag: data.tag || this.tag,
        joinType: data.joinType || this.joinType,
        minLevel: data.requiredLevel || this.requiredLevel
      })
    });

    const response = await request.json();
    return new this(response);
  }

  async delete() {
    await fetch('https://api-core.wolvesville.com/clans/', {
      method: 'DELETE',
      headers: getAuthenticationHeaders(this.client.token)
    });
  }

}

module.exports = ClientClan;
