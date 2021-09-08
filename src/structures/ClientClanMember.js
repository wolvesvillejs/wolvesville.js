const ClanMember = require('./ClanMember');
const { getAuthenticationHeaders } = require('../util/Headers');
const fetch = require('node-fetch');

class ClientClanMember extends ClanMember {
  constructor(client, data) {
    super(client, data);
  }

  async kick() {
    const request = await fetch(`https://api-core.wolvesville.com/clans/members/${this.id}/remove`, {
      method: 'POST',
      headers: getAuthenticationHeaders(this.client.token)
    });
    const response = await request.json();
    return response;
  }

}

module.exports = ClientClanMember;
