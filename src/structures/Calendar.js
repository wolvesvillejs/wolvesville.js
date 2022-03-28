const Base = require('./Base');
const CalendarReward = require('./CalendarReward');

class Calendar extends Base {
  constructor(client, data) {
    super(client);
    this.id = data.calendarId;
    this.title = data.title;
    this.description = data.description;
    this.type = data.gemOfferType;

    this.claimed = data.owned;
    if(this.claimed) {
      this.claimTimestamp = data.claimTime;
      this.nextReward = data.nextReward;
      this.nextRewardTimestamp = data.nextRewardTimestamp;

      this.claimedRewards = data.claimedRewards.map((reward, index) => new CalendarReward(
        client,
        Object.assign(reward, {
          claimed: this.nextReward >= index
        })
      ));
    }

    this.duration = data.durationInDays;
    this.startTimestamp = data.startTime;
    this.endTimestamp = new Date(new Date(this.startTimestamp).getTime() + this.duration * 24 * 60 * 60 * 1000).toISOString();

    Object.defineProperty(this, '_assets', { value: {
      backgroundImage: {
        name: data.backgroundImageName,
        color : data.backgroundImagePrimaryColor
      },
      iconImage: {
        name: data.iconImageName
      },
      text: {
        color: data.textColor,
        backgroundColor: data.textBackgroundColor
      }
    }});
  }

  /**
   * Calendar background image url.
   * @returns {string}
   * @readonly
   */
  get backgroundImageURL() {
    return `${this.client.options.http.cdn}/calendars/${this._assets.backgroundImage}.png`;
  }

  /**
   * Calendar icon image url.
   * @returns {string}
   * @readonly
   */
  get iconImageURL() {
    return `${this.client.options.http.cdn}/calendars/${this._assets.iconImage}.png`;
  }

}

module.exorts = Calendar;
