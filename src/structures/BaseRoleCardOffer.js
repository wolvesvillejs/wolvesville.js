'use strict';

const Base = require('./Base');

/**
 * Represents a base role card offer.
 * @extends {Base}
 */
class BaseRoleCardOffer extends Base {
  constructor(client, data) {
    super(client);

    /**
     * Offer id
     * @type {string}
     */
    this.id = data.id;

    this._patch(data);
  }

  _patch(data) {
    if ('baseRoleId' in data) {
      /**
       * Base role id
       * @type {?string}
       */
      this.baseRoleId = data.baseRoleId;
    } else {
      this.baseRoleId ??= null;
    }

    if ('rareRoleCardCount' in data) {
      /**
       * Number of rare role cards included
       * @type {?number}
       */
      this.rareRoleCardCount = data.rareRoleCardCount;
    } else {
      this.rareRoleCardCount ??= null;
    }

    if ('avatarItemSetId' in data) {
      /**
       * Avatar item set id
       * @type {?string}
       */
      this.avatarItemSetId = data.avatarItemSetId;
    } else {
      this.avatarItemSetId ??= null;
    }

    if ('abilityExchangeVoucherCount' in data) {
      /**
       * Number of ability exchange vouchers included
       * @type {?number}
       */
      this.abilityExchangeVoucherCount = data.abilityExchangeVoucherCount;
    } else {
      this.abilityExchangeVoucherCount ??= null;
    }

    if ('talismanCount' in data) {
      /**
       * Number of talismans included
       * @type {?number}
       */
      this.talismanCount = data.talismanCount;
    } else {
      this.talismanCount ??= null;
    }

    if ('loyaltyTokenCount' in data) {
      /**
       * Number of loyalty tokens included
       * @type {?number}
       */
      this.loyaltyTokenCount = data.loyaltyTokenCount;
    } else {
      this.loyaltyTokenCount ??= null;
    }

    if ('promoImageUrl' in data) {
      /**
       * Promo image URL
       * @type {?string}
       */
      this.promoImageURL = data.promoImageUrl;
    } else {
      this.promoImageURL ??= null;
    }
  }
}

module.exports = BaseRoleCardOffer;
