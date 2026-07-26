import { Component } from '@theme/component';

const UNITS = ['days', 'hours', 'minutes', 'seconds'];
const LIVE_REGION_UPDATE_INTERVAL_MS = 60_000;

/**
 * Renders a live countdown to a merchant-configured target date.
 *
 * The visible digits are `aria-hidden` and update every second; a single
 * `aria-live="polite"` region summarizes the remaining time once a minute so
 * screen reader users aren't spammed with a per-second announcement.
 *
 * @typedef {object} Refs
 * @property {HTMLElement} [daysValue]
 * @property {HTMLElement} [hoursValue]
 * @property {HTMLElement} [minutesValue]
 * @property {HTMLElement} [secondsValue]
 * @property {HTMLElement} [liveRegion]
 *
 * @extends {Component<Refs>}
 */
export class ComingSoonCountdown extends Component {
  /** @type {number | undefined} */
  #intervalId;
  #lastLiveRegionUpdate = 0;

  connectedCallback() {
    super.connectedCallback();
    this.#tick();
    this.#intervalId = window.setInterval(() => this.#tick(), 1000);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.clearInterval(this.#intervalId);
  }

  #tick() {
    const target = Date.parse(this.dataset.target ?? '');

    if (Number.isNaN(target)) return;

    const remainingMs = target - Date.now();

    if (remainingMs <= 0) {
      this.#renderExpired();
      return;
    }

    const totalSeconds = Math.floor(remainingMs / 1000);
    const values = {
      days: Math.floor(totalSeconds / 86400),
      hours: Math.floor((totalSeconds % 86400) / 3600),
      minutes: Math.floor((totalSeconds % 3600) / 60),
      seconds: totalSeconds % 60,
    };

    for (const unit of UNITS) {
      const ref = this.refs[`${unit}Value`];
      if (ref) ref.textContent = String(values[unit]).padStart(2, '0');
    }

    this.#updateLiveRegion(values);
  }

  /** @param {Record<string, number>} values */
  #updateLiveRegion(values) {
    const now = Date.now();
    if (now - this.#lastLiveRegionUpdate < LIVE_REGION_UPDATE_INTERVAL_MS) return;

    this.#lastLiveRegionUpdate = now;

    const liveRegion = this.refs.liveRegion;
    if (!liveRegion) return;

    const summary = UNITS.filter((unit) => unit !== 'seconds')
      .map((unit) => `${values[unit]} ${this.dataset[`label${capitalize(unit)}`] ?? unit}`)
      .join(', ');

    liveRegion.textContent = summary;
  }

  #renderExpired() {
    window.clearInterval(this.#intervalId);

    for (const unit of UNITS) {
      const ref = this.refs[`${unit}Value`];
      if (ref) ref.textContent = '00';
    }

    if (this.refs.liveRegion) {
      this.refs.liveRegion.textContent = this.dataset.expiredMessage ?? '';
    }

    this.toggleAttribute('expired', true);
  }
}

/** @param {string} value */
function capitalize(value) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

if (!customElements.get('coming-soon-countdown')) {
  customElements.define('coming-soon-countdown', ComingSoonCountdown);
}
