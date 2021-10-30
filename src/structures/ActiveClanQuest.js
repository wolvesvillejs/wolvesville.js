const Base = require('./Base');
const ClanQuest = require('./ClanQuest');
const ClanQuestParticipant = require('./ClanQuestParticipant');

class ActiveClanQuest extends ClanQuest {
  constructor(client, data) {
    super(client, data.quest);
    this.tierCompleted = data.tierFinished;
    this.tier = data.tier;
    this.xp = data.xp;
    this.requiredXp = data.xpPerReward;
    this.tierStartTimestamp = new Date(data.tierStartTime);
    this.tierEndTimestamp = new Date(data.tierEndTime);
    this.participants = data.participants.map(participant => new ClanQuestParticipant(client, participant));
    this.moreTimeClaimed = data.claimedTime;
  }
}

module.exports = ActiveClanQuest;
