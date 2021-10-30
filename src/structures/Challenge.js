const Base = require('./Base');

class Challenge extends Base {
  constructor(client, data) {
    super(client);
    this.description = data.description;
    this.target = data.challengeTarget;
    this.progress = data.challengeProgress;
    this.completed = this.progress === this.target ? true : false;
    this.reward = data.rewardInGems || data.rewardInXp;
  }
}

module.exports = Challenge;
