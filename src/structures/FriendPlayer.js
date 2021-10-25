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
}

module.exports = FriendPlayer;
