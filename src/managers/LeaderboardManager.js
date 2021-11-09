const BaseManager = require('./BaseManager');
const LifetimeXPLeaderboard = require('../structures/LifetimeXPLeaderboard');
const MonthlyXPLeaderboard = require('../structures/MonthlyXPLeaderboard');
const WeeklyXPLeaderboard = require('../structures/WeeklyXPLeaderboard');
const DailyXPLeaderboard = require('../structures/DailyXPLeaderboard');
const FriendsXPLeaderboard = require('../structures/FriendsXPLeaderboard');
const RankedLeaderboard = require('../structures/RankedLeaderboard');
const { CORE_API_URL } = require('../util/Constants');
const { getAuthenticationHeaders } = require('../util/Headers');
const fetch = require('node-fetch');

class LeaderboardManager extends BaseManager {
  constructor(client) {
    super(client);
  }

  async fetchXP({ frequency } = {}) {
    if(frequency === 0) {
      var [suffix, leaderboard] = ['', LifetimeXPLeaderboard];
    } else if(frequency === 1) {
      var [suffix, leaderboard] = ['Monthly', MonthlyXPLeaderboard];
    } else if(frequency === 2) {
      var [suffix, leaderboard] = ['Weekly', WeeklyXPLeaderboard];
    } else if(frequency === 3) {
      var [suffix, leaderboard] = ['Daily', DailyXPLeaderboard];
    } else if(frequency === 4) {
      var [suffix, leaderboard] = ['Friends', FriendsXPLeaderboard];
    } else throw new Error('LEADERBOARD_FREQUENCY_OUT_OF_RANGE');
    const request = await fetch(`${CORE_API_URL}/highScores/top100${suffix || ''}`, {
      method: 'GET',
      headers: getAuthenticationHeaders(this.client.token)
    });
    const response = await request.json();
    return new leaderboard(this.client, response);
  }

  async fetchRanked({ offset } = {}) {
    const request = await fetch(`${CORE_API_URL}/ranked/highScore${!offset ? '/top100' : ''}`, {
      method: 'GET',
      headers: getAuthenticationHeaders(this.client.token)
    });
    const response = await request.json();
    return new RankedLeaderboard(this.client, response);
  }

}

module.exports = LeaderboardManager;
