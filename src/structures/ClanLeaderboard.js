const ClanSearcher = require('./ClanSearcher');

class ClanLeaderboard extends ClanSearcher {
  constructor(client, data) {
    super(client, data);
  }

   get top10Requirement() {
     return this.entries[9].xp;
   }

   get top100Requirement() {
     return this.entries[99].xp;
   }

   get firstPlace() {
     return this.entries[0];
   }

   getPlace(index) {
     return this.entries[index - 1];
   }

   getRangePlaces(startIndex, endIndex) {
     return this.entries.slice(startIndex - 1, endIndex);
   }

}

module.exports = ClanLeaderboard;
