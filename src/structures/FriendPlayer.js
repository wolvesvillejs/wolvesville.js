const BasePlayer = require('./BasePlayer')
const { getAuthenticationHeaders } = require('../util/Headers');
const fetch = require('node-fetch');

class FriendPlayer extends BasePlayer {
  constructor(client, data) {
    super(client);

    this.id = data.id;
    this.username = data.username;
    this.level = data.level;
    this.lastOnlineTimestamp = data.lastOnline;
    this.profileIcon = {
      id: data.profileIconId,
      color: data.profileIconColor
    }
    this.clanTag = data.clanTag || null;
    this.status = data.playerStatus;
    this.favourite = data.favourite;
  }

  async sendMessage(content) {
    const request = await fetch('https://api-core.wolvesville.com/privateChat', {
      method: 'POST',
      headers: getAuthenticationHeadersContainsBody(this.client.token),
      body: JSON.stringify({
        targetPlayerId: this.id,
        msg: content
      })
    });
    const response = await request.json();
    return response;
  }

  async markAsFavourite() {
    await fetch(`https://api-core.wolvesville.com/friends/${this.id}/favourite`, {
      method: 'PUT',
      headers: getAuthenticationHeaders(this.client.token)
    });
  }

  async unmarkAsFavourite() {
    await fetch(`https://api-core.wolvesville.com/friends/${this.id}/favourite`, {
      method: 'DELETE',
      headers: getAuthenticationHeaders(this.client.token)
    });
  }

  async remove() {
    const request = await fetch(`https://api-core.wolvesville.com/friends/${this.id}`, {
      method: 'DELETE',
      headers: getAuthenticationHeaders(this.client.token)
    });
    const response = await request.json();
    return response;
  }

}

module.exports = FriendPlayer;
