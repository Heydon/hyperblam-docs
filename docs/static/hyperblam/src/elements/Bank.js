import { Handle } from '../primitives/Handle.js';
import { define } from '../tools/define.js';

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
      if (this.sounds.length == this.sampleElems.length) {
        this.fire('blambank', {
          sounds: this.sounds
        }, this);
      }
    }
  }

  async initBuffers() {
    this.sampleElems = [...this.querySelectorAll(`sample-blam`)];
    for (const sampleElem of this.sampleElems) {
      await sampleElem.fileToBuffer();
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('blamsource', this);
  }

  static {
    define(this);
  }
}

export { Bank }