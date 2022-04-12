const BaseManager = require('./BaseManager');
const FriendsXPLeaderboard = require('../structures/FriendsXPLeaderboard');
const DailyXPLeaderboard = require('../structures/DailyXPLeaderboard');
const WeeklyXPLeaderboard = require('../structures/WeeklyXPLeaderboard');
const MonthlyXPLeaderboard = require('../structures/MonthlyXPLeaderboard');
const LifetimeXPLeaderboard = require('../structures/LifetimeXPLeaderboard');
const RankedLeaderboard = require('../structures/RankedLeaderboard');
const { getAuthenticationHeaders } = require('../util/Headers');
const fetch = require('node-fetch');

/**
 * Manages API methods for Leaderboards.
 * @extends {BaseManager}
 */
class LeaderboardManager extends BaseManager {
  constructor(client) {
    super(client);
  }

  async fetchFriendsXP() {
    const request = await fetch(`${this.client.options.http.api.core}/highScores/top100Friends`, {
      method: 'GET',
      headers: getAuthenticationHeaders(this.client.token)
    });
    const response = await request.json();
    return new FriendsXPLeaderboard(this.client, response);
  }

  async fetchDailyXP() {
    const request = await fetch(`${this.client.options.http.api.core}/highScores/top100Daily`, {
      method: 'GET',
      headers: getAuthenticationHeaders(this.client.token)
    });
    const response = await request.json();
    return new DailyXPLeaderboard(this.client, response);
  }

  async fetchWeeklyXP() {
    const request = await fetch(`${this.client.options.http.api.core}/highScores/top100Weekly`, {
      method: 'GET',
      headers: getAuthenticationHeaders(this.client.token)
    });
    const response = await request.json();
    return new WeeklyXPLeaderboard(this.client, response);
  }

  async fetchMonthlyXP() {
    const request = await fetch(`${this.client.options.http.api.core}/highScores/top100Monthly`, {
      method: 'GET',
      headers: getAuthenticationHeaders(this.client.token)
    });
    const response = await request.json();
    return new MonthlyXPLeaderboard(this.client, response);
  }

  async fetchXP() {
    const request = await fetch(`${this.client.options.http.api.core}/highScores/top100`, {
      method: 'GET',
      headers: getAuthenticationHeaders(this.client.token)
    });
    const response = await request.json();
    return new LifetimeXPLeaderboard(this.client, response);
  }

  async fetchRanked(options = {}) {
    if(options.offset && typeof options.offset !== 'boolean') throw new Error('OPTION_MUST_BE_A_BOOLEAN');
    const request = await fetch(`${this.client.options.http.api.core}/ranked/highScore${!options.offset ? '/top100' : ''}`, {
      method: 'GET',
      headers: getAuthenticationHeaders(this.client.token)
    });
    const response = await request.json();
    return new RankedLeaderboard(this.client, response);
  }

}

module.exports = LeaderboardManager;
