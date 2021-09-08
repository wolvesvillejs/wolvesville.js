const Base = require('./Base');

class AvatarSlot extends Base {
  constructor(client, data) {
    super(client);

    this.slot = data.slot;
    this.avatar = {
      eyes: {
        id: data.avatarEyesId
      },
      clothes: {
        id: data.avatarClothesBodyId
      },
      gravestone: {
        id: data.gravestoneId
      },
      skinColor: data.skinColor
    }

    this.avatar.hat = data.avatarHatId ? {
      id: data.avatarHatId
    } : null;

    this.avatar.hair = data.avatarHairId ? {
      id: data.avatarHairId
    } : null;

    this.avatar.glasses = data.avatarGlassesId ? {
      id: data.avatarGlassesId
    } : null;

    this.avatar.mouth = data.avatarMouthId ? {
      id: data.avatarMouthId
    } : null;

    this.avatar.mask = data.avatarMaskId ? {
      id: data.avatarMaskId
    } : null;

    this.avatar.badge = data.avatarBadgeId ? {
      id: data.avatarBadgeId
    } : null;

    this.avatar.foreground = data.avatarFrontId ? {
      id: data.avatarFrontId
    } : null;

    this.avatar.background = data.avatarBackId ? {
      id: data.avatarBackId
    } : null;
  }
}

module.exports = AvatarSlot;
