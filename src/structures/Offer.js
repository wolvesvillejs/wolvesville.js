'use strict';

const Base = require('./Base');

/**
 * Represents an offer.
 * @extends {Base}
 */
class Offer extends Base {
  constructor(client, data) {
    super(client);

    this._patch(data);
  }

  _patch(data) {
    if ('type' in data) {
      /**
       * Offer name
       * @type {?string}
       */
      this.name = data.type;
    } else {
      this.name ??= null;
    }

    if ('costInGems' in data) {
      /**
       * Offer cost
       * @type {?number}
       */
      this.cost = data.costInGems;
    } else {
      this.cost ??= null;
    }

    if ('expireDate' in data) {
      /**
       * Offer expiration timestamp
       * @type {number}
       */
      this.expirationTimestamp = new Date(data.expireDate).getTime();
    }

    if ('promoImageUrl' in data) {
      /**
       * Offer promo image URL
       * @type {?string}
       */
      this.promoImageURL = data.promoImageUrl ?? null;
    } else {
      this.promoImageURL ??= null;
    }

    if ('iconUrl' in data) {
      /**
       * Offer icon URL
       * @type {?string}
       */
      this.iconURL = data.iconUrl ?? null;
    } else {
      this.iconURL ??= null;
    }

    if ('emojisCollectionId' in data) {
      /**
       * Associated emoji collection id
       * @type {?string}
       */
      this.emojisCollectionId = data.emojisCollectionId ?? null;
    } else {
      this.emojisCollectionId ??= null;
    }

    if ('baseRoleCardOfferId' in data) {
      /**
       * Associated base role card offer id
       * @type {?string}
       */
      this.baseRoleCardOfferId = data.baseRoleCardOfferId ?? null;
    } else {
      this.baseRoleCardOfferId ??= null;
    }

    if ('bundleId' in data) {
      /**
       * Associated bundle id
       * @type {?string}
       */
      this.bundleId = data.bundleId ?? null;
    } else {
      this.bundleId ??= null;
    }
  }
}

module.exports = Offer;
