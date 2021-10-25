const ClanMember = require('./ClanMember');
const { getAuthenticationHeaders } = require('../util/Headers');
const fetch = require('node-fetch');

class ClientClanMember extends ClanMember {
  constructor(client, data) {
    super(client, data);
  }
}

module.exports = ClientClanMember;
