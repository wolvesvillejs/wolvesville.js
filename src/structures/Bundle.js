'use strict';

const Background = require('./Background');
const Base = require('./Base');
const BodyPaint = require('./BodyPaint');
const Emoji = require('./Emoji');
const ItemSet = require('./ItemSet');
const LoadingScreen = require('./LoadingScreen');
const RoleIcon = require('./RoleIcon');
const RoseSkin = require('./RoseSkin');

/**
 * Represents a bundle.
 * @extends {Base}
 */
class Bundle extends Base {
  constructor(client, data) {
    super(client);

    /**
     * Bundle id
     * @type {string}
     */
    this.id = data.id;

    this._patch(data);
  }

  _patch(data) {
    if ('costInGems' in data) {
      /**
       * Bundle cost in gems
       * @type {?number}
       */
      this.costInGems = data.costInGems ?? null;
    } else {
      this.costInGems ??= null;
    }

    if ('promoImageUrl' in data) {
      /**
       * Bundle promo image URL
       * @type {?string}
       */
      this.promoImageURL = data.promoImageUrl;
    } else {
      this.promoImageURL ??= null;
    }

    if ('promoImagePrimaryColor' in data) {
      /**
       * Bundle accent color
       * @type {?string}
       */
      this.accentColor = data.promoImagePrimaryColor;
    } else {
      this.accentColor ??= null;
    }

    if ('iconUrl' in data) {
      /**
       * Bundle icon URL
       * @type {?string}
       */
      this.iconURL = data.iconUrl;
    } else {
      this.iconURL ??= null;
    }

    if ('avatarItemSets' in data) {
      /**
       * Bundle avatar item sets
       * @type {ItemSet[]}
       */
      this.avatarItemSets = data.avatarItemSets.map(s => new ItemSet(this.client, s));
    } else {
      this.avatarItemSets ??= null;
    }

    if ('emojis' in data) {
      /**
       * Bundle emojis
       * @type {Emoji[]}
       */
      this.emojis = data.emojis.map(e => new Emoji(this.client, e));
    } else {
      this.emojis ??= null;
    }

    if ('loadingScreens' in data) {
      /**
       * Bundle loading screens
       * @type {LoadingScreen[]}
       */
      this.loadingScreens = data.loadingScreens.map(ls => new LoadingScreen(this.client, ls));
    } else {
      this.loadingScreens ??= null;
    }

    if ('backgrounds' in data) {
      /**
       * Bundle backgrounds
       * @type {Background[]}
       */
      this.backgrounds = data.backgrounds.map(bg => new Background(this.client, bg));
    } else {
      this.backgrounds ??= null;
    }

    if ('roleIcons' in data) {
      /**
       * Bundle role icons
       * @type {RoleIcon[]}
       */
      this.roleIcons = data.roleIcons.map(ri => new RoleIcon(this.client, ri));
    } else {
      this.roleIcons ??= null;
    }

    if ('bodyPaints' in data) {
      /**
       * Bundle body paints
       * @type {BodyPaint[]}
       */
      this.bodyPaints = data.bodyPaints.map(bp => new BodyPaint(this.client, bp));
    } else {
      this.bodyPaints ??= null;
    }

    if ('roseSkins' in data) {
      /**
       * Bundle rose skins
       * @type {RoseSkin[]}
       */
      this.roseSkins = data.roseSkins.map(rs => new RoseSkin(this.client, rs));
    } else {
      this.roseSkins ??= null;
    }
  }
}

module.exports = Bundle;
