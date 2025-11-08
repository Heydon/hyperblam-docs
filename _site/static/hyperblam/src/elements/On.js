import { Event } from '../helpers/Event.js';
import { define } from '../helpers/define.js';

class On extends Event {
  constructor() {
    super();
    this.defaultPubs = () => [this.closest('midi-blam')];
    this.defaultSubs = () => [this.closest('[data-player-blam]')];
    this.defaultEvent = 'midiOn';
  }

  inRange(noteNum) {
    if (!this.range) {
      return true;
    }
    return this.between(noteNum, this.root, this.root + this.range);
  }

  modify(event) {
    let tonal = event.detail.tonal;
    let soundCount = this.subElems[0]?.sounds.length;
    if (this.device && this.device !== event.detail.device) {
      return;
    }
    let note = event.detail.note;
    if (!tonal && this.spread) {
      this.range = soundCount;
    }
    if (!this.inRange(note)) {
      return;
    }
    for (const player of this.subElems) {
      if (event.detail.tonal) {
        player.play(note);
      } else {
        this.soundCount = soundCount;
        if (this.spread) {
          player.play((note - this.root) + 1);
        } else {
          player.play();
        }
      }
    }
  }

  get device() {
		return this.getAttribute('device');
	}

	set device(value) {
		if (value) {
			this.setAttribute('device', value);
    }
  }

  get root() {
    let value = this.getAttribute('root');
		return value ? this.nameToNum(value) : 60;
	}

	set root(value) {
		if (value) {
			this.setAttribute('root', value);
    }
  }

  get range() {
		let value = this.getAttribute('range');
    return this.parse(value, null);
	}

	set range(value) {
		if (value) {
			this.setAttribute('range', value);
    }
  }

  get spread() {
		return this.hasAttribute('spread');
	}

	set spread(value) {
		this.toBoolean('spread', value);
	}

  static {
    define(this);
  }
}

export { On }