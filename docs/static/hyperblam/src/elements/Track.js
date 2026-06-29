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
    this.parts = [...this.querySelectorAll(':scope > :where(bar-blam, repeat-blam)')];
    this.indices = this.createIndices();
    this.reset();
  }

  createIndices() {
    let indices = [];
    this.parts.forEach((p, i) => {
      let part;
      if (p.repeat) {
        let barElems = [...p.querySelectorAll('bar-blam')];
        let mapped = barElems.map(b => this.barElems.indexOf(b));
        part = new Array(p.x).fill(mapped).flat();
      } else {
        part = this.barElems.indexOf(p);
      }
      indices.push(part);
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
    if (
      !this.probable ||
      overridden 
    ) 
    return false;
    return true;
  }

  play(player, tracks) {
    this.playOrNot(tracks) && player.play(this.cipher, this.time);
    if (this.cipher !== 0) {
      this.fire('blam', { 
        time: this.time
      },
      this);
    }
  }

  reset() {
    this.bars = this.bar = this.step = 0;
  }

  getBar() {
    return this.barElems[this.indices[this.bar]];
  }

  barBlam(data) {
    this.fire('blam', data, this.getBar());
  }

  handle(event) {
    for (const player of this.toElems) {
      this.play(player, event.detail.tracks);
    }
    this.step++;
    this.time = event.detail.time;

    if (this.step > this.getBar().steps.length - 1) {
      let data = { time: this.time };
      this.barBlam(data);
      this.fire('blambar', data, this);
      this.step = 0;
      this.bar++;
      this.bars++;
    }

    if (this.bar > this.indices.length - 1) {
      this.bar = 0;
    }
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
}

export { Track }