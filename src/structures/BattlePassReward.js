'use strict';

const Base = require('./Base');
const { ItemTypes } = require('../util/Constants');

/**
 * Represents a battle pass reward.
 * @extends {Base}
 */
class BattlePassReward extends Base {
  constructor(client, data) {
    super(client);

    /**
     * Reward tier
     * @type {number}
     */
    this.tier = data.tier + 1;

    /**
     * Reward type
     * @type {string}
     */
    this.type = ItemTypes[data.type];

    /**
     * Reward amount
     * @type {number}
     */
    this.amount = data.amount;

    if ([ItemTypes.AVATAR_ITEM, ItemTypes.PROFILE_ICON, ItemTypes.EMOJI, ItemTypes.ROSE_PACKAGE].includes(this.type)) {
      /**
       * Reward item(s)
       * @type {AvatarItem|AvatarItem[]|ProfileIcon|Emoji|Rose}
       */
      this.item =
        data.avatarItemIdMale && data.avatarItemIdFemale
          ? [
              client.items.resolve(data.avatarItemIdMale, this.type),
              client.items.resolve(data.avatarItemIdFemale, this.type),
            ]
          : client.items.resolve(
              data.avatarItemId || data.rosePackageId || data.emojiId || data.profileIconId,
              this.type,
            );
    }

    /**
     * Whether the reward is free
     * @type {boolean}
     */
    this.free = data.free;
  }
}

module.exports = BattlePassReward;
