import { Handle } from '../primitives/Handle.js';
import { define } from '../tools/define.js';

class On extends Handle {
  constructor() {
    super();
    this.defaultFrom = () => [this.closest('midi-blam')];
    this.defaultTo = () => [this.closest('[data-sampler-blam]')];
    this.defaultEvent = 'midiOn';
  }

  inRange(noteNum) {
    if (!this.range) {
      return true;
    }
    return this.between(noteNum, this.root, this.root + (this.range - 1));
  }

  handle(event) {
    if (this.device && this.device !== event.detail.device) {
      return;
    }
    for (const to of this.toElems) {
      let soundCount = to.bankElem.sounds.length;
      let note = event.detail.note;
      if (!this.inRange(note)) {
        return;
      }
      let tonal = to.tonal;
      if (tonal) {
        to.play(note);
      } else {
        if (this.spread) {
          to.play((note - this.root) + 1);
        } else {
          to.play();
        }
      }
    }
  }

  get device() {
		return this.getAttribute('device');
	}

	set device(value) {
		this.setAttribute('device', value);
  }

  get root() {
    let value = this.getAttribute('root');
		return value ? this.nameToNum(value) : 60;
	}

	set root(value) {
		this.setAttribute('root', value);
  }

  get range() {
		let value = this.getAttribute('range');
    return value ? parseFloat(value) : null;
	}

	set range(value) {
		this.setAttribute('range', value);
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