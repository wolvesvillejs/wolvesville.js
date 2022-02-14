const ClanSearcher = require('./ClanSearcher');

/**
 * Clan leadeboard.
 * @extends {ClanSearcher}
 */
class ClanLeaderboard extends ClanSearcher {
  constructor(client, data) {
    super(client, data);
  }

  /**
   * Clan xp needed to be in top 10.
   * @return {number}
   * @readonly
   */
   get top10Requirement() {
     return this.entries[9].xp;
   }

   /**
    * Clan xp needed to be in top 100.
    * @return {number}
    * @readonly
    */
   get top100Requirement() {
     return this.entries[99].xp;
   }

   /**
    * Clan on the first place.
    * @return {Object}
    * @readonly
    */
   get firstPlace() {
     return this.entries[0];
   }

   /**
    * Clan at a specific place.
    * @return {Object}
    * @readonly
    */
   getPlace(index) {
     return this.entries[index - 1];
   }

   /**
    * Clans at specific places.
    * @return {Array<Object>}
    * @readonly
    */
   getRangePlaces(startIndex, endIndex) {
     return this.entries.slice(startIndex - 1, endIndex);
   }

}

module.exports = ClanLeaderboard;
