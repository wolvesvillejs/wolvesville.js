const Base = require('./Base');
const CustomGameHost = require('./CustomGameHost');

class CustomGame extends Base {
  constructor(client, data) {
    super(client);
    this.id = data.gameId;
    this.name = data.name;
    this.host = new CustomGameHost(client, {
      username: data.hostName
    });
    this.language = data.language;
    this.roles = data.roles;
    this.playerCount = data.playerCount;
    this.xp = data.regularXp;
    this.parameters = {
      nightDuration: data.nightDurationInMs,
      dayDiscussionDuration: data.dayDiscussionDurationInMs,
      dayVoteDuration: data.dayVotingDurationInMs,
      voiceEnabled: data.voiceEnabled
    }
  }
}

module.exports = CustomGame;
