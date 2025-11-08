import { Event } from '../helpers/Event.js';
import { define } from '../helpers/define.js';

class Track extends Event {
  constructor() {
    super();
    this.defaultPubs = () => [this.closest('sequencer-blam')];
    this.defaultSubs = () => [this.closest('[data-player-blam]')];
  }

  onblamready() {
    this.barProbable(this.barElems[0]);
  }

  playOrNot(tracks) {
    let overridden = tracks.find(t => {
      return (!this.solo && t.solo) || 
             (t.cipher !== null && t.override?.includes(this.id) && t.probable && !t.suspend && !(this.solo && !t.solo))
    });
    if (
      !this.barElems[this.bar].probable ||
      !this.probable ||
      overridden 
    ) 
    return false;
    return true;
  }

  play(player, tracks) {
    this.playOrNot(tracks) && player.play(this.cipher, this.time);
  }

  barProbable(bar) {
    bar.probable = this.random.chance(bar.chance);
  }

  reset() {
    this.bars = this.bar = this.step = 0;
  }

  modify(event) {
    for (const player of this.subElems) {
      this.play(player, event.detail.tracks);
    }

    this.step++;
    this.time = event.detail.time;

    if (this.step > this.barElems[this.bar].steps.length - 1) {
      this.step = 0;
      this.bar++;
      this.bars++;
      this.fire('blam', { 
        time: this.time,
        bar: this.barElems[this.bar],
        bars: this.bars
      }, this, false);
    }
    if (this.bar > this.barElems.length - 1) {
      this.bar = 0;
    }
    this.barProbable(this.barElems[this.bar]);
  }

  get solo() {
		return this.hasAttribute('solo');
	}

	set solo(value) {
		this.toBoolean('solo', value);
	}

  get override() {
    let value = this.getAttribute('override');
    return value ? value.trim().split(' ') : null;
	}

	set override(value) {
		if (value) {
			this.setAttribute('override', value.join(' '));
    }
  }

  connectedCallback() {
    super.connectedCallback();
    this.barElems = [...this.querySelectorAll('bar-blam')];
    this.reset();
  }

  static {
    define(this);
  }
}

export { Track }