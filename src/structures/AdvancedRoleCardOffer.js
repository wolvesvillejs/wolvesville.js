'use strict';

const Base = require('./Base');
const { ItemTypes } = require('../util/Constants');

/**
 * Represents an offer.
 * @extends {Base}
 */
class AdvancedRoleCardOffer extends Base {
  constructor(client, data) {
    super(client);

    this._patch(data);
  }

  _patch(data) {
    if ('advancedRoleId' in data) {
      /**
       * Offer name
       * @type {?string}
       */
      this.name = data.advancedRoleId;
    } else {
      this.name ??= null;
    }

    if ('avatarItemSetId' in data) {
      /**
       * Item set
       * @type {?ItemSet}
       */
      this.itemSet = this.client.items.resolve(data.avatarItemSetId, ItemTypes.ITEM_SET);
    } else {
      this.itemSet ??= null;
    }

    if ('abilityExchangeVoucherCount' in data) {
      /**
       * Ability exchange voucher count
       * @type {?number}
       */
      this.abilityExchangeVoucherCount = data.abilityExchangeVoucherCount;
    } else {
      this.abilityExchangeVoucherCount ??= null;
    }

    if ('talismanCount' in data) {
      /**
       * Talisman count
       * @type {?number}
       */
      this.talismanCount = data.talismanCount;
    } else {
      this.talismanCount ??= null;
    }

    if ('loyaltyTokenCount' in data) {
      /**
       * Loyalty token count
       * @type {?number}
       */
      this.loyaltyTokenCount = data.loyaltyTokenCount;
    } else {
      this.loyaltyTokenCount ??= null;
    }
  }
}

module.exports = AdvancedRoleCardOffer;
