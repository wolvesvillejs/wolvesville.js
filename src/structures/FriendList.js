const Base = require('./Base');
const FriendPlayer = require('./FriendPlayer');

class FriendList extends Base {
  constructor(client, data) {
    super(client);
    this.entries = data.map(friend => new FriendPlayer(this.client, friend));
    this.friendCount = data.length;
  }

  get favourites() {
    return this.entries.filter(friend => friend.favourite);
  }

  get online() {
    return this.entries.filter(friend => friend.online);
  }

}

module.exports = FriendList;
