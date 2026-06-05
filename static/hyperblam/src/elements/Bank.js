import { Handle } from '../primitives/Handle.js';

class Bank extends Handle {
	constructor() {
		super();
    this.sounds = [];
    
    this.defaultEvent = 'blamready';
    this.defaultFrom = () => [window];
    this.defaultTo = () => [this];

    this.addEventListener('blamsource', this);
	}

  handleEvent(event) {
    if (event.type === this.event) {
      this.initBuffers();
    }
    if (event.type === 'blamsource') {
      this.sounds.push(event.detail);
      if (this.sounds.length === this.sampleElems.length) {
        // ↓ Use index to put sounds back in order of source
        this.sounds.sort(({index:a}, {index:b}) => a - b);
        this.fire('blambank', {
          sounds: this.sounds
        }, this);
      }
    }
  }

  async initBuffers() {
    this.sampleElems = [...this.querySelectorAll(`sample-blam`)];
    const samples = this.sampleElems.map((e, i) => e.fileToBuffer(i));
    await Promise.all(samples);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('blamsource', this);
  }
}

export { Bank }