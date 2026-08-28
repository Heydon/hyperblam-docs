import { Handle } from '../primitives/Handle.js';

class Track extends Handle {
  constructor() {
    super();
    this.defaultFrom = () => [this.closest('sequencer-blam')];
    this.defaultTo = () => [this.closest('[data-sampler-blam]')];
  }

  onblamready() {
    super.onblamready();
    this.barElems = [...this.querySelectorAll('bar-blam')];
    let bits = [...this.querySelectorAll(':scope :where(bar-blam, repeat-blam)')];
    this.indices = this.createIndices(bits);
    this.reset();
  }

  createIndices(bits) {
    let indices = [];
    bits.forEach((b, i) => {
      let bit;
      if (b.repeat) {
        let barElems = [...b.querySelectorAll('bar-blam')];
        let mapped = barElems.map(b => this.barElems.indexOf(b));
        bit = new Array(b.x).fill(mapped).flat();
      } else {
        bit = this.barElems.indexOf(b);
      }
      indices.push(bit);
    });
    return indices.flat();
  }

  playOrNot(tracks) {
    let overridden = tracks.find(t => {
      return (!this.solo && t.solo) || 
             (t.cipher !== 0 && 
              t.override?.includes(this.id) && 
              t.probable && !t.suspend && 
              !(this.solo && !t.solo))
    });
    return !(!this.probable || overridden);
  }

  handle(event) {
    for (const player of this.toElems) {
      this.play(player, event.detail.tracks);
    }
    this.step++;
    this.time = event.detail.time;
    let data = { time: this.time };

    if (this.step > this.getBar().steps.length - 1) {
      this.step = 0;
      this.bar++;
      this.bars++;
      this.fire('blam', data, this.getBar());
      this.fire('blam', data, this);
    }

    if (this.bar > this.partElem.indices.length - 1) {
      this.bar = 0;
      this.partChanging && this.setPart();
      this.partChanging && this.fire('blampart', data, this);
    }
  }

  play(player, tracks) {
    this.playOrNot(tracks) && player.play(this.cipher, this.time);
  }

  reset() {
    this.bars = this.bar = this.step = 0;
  }

  setPart() {
    this.partElem = this.querySelector(this.part) || this;
    this.partChanging = false;
  }

  getBar() {
    return this.barElems[this.partElem.indices[this.bar]];
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
		this.setAttribute('override', value.join(' '));
  }

  get suspend() {
		return this.hasAttribute('suspend');
	}

	set suspend(value) {
		this.toBoolean('suspend', value);
	}

  get part() {
    return this.getAttribute('part');
	}

	set part(value) {
		this.setAttribute('part', value);
  }

  static get observedAttributes () {
    return ['part'];
  }

  attributeChangedCallback(name) {
    if (name === 'part') {
      this.partChanging = true;
    }
  }

  connectedCallback() {
    this.setPart();
  }
}

export { Track }