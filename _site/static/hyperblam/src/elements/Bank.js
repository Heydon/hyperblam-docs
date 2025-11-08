import { Base } from '../helpers/Base.js';
import { define } from '../helpers/define.js';

class Bank extends Base {
	constructor() {
		super();
    this.sounds = [];
    this.addEventListener('sample', this);
	}

  onblamready() {
    this.initBuffers();
  }

  onsample(event) {
    this.sounds.push(event.detail);
    if (this.sounds.length == this.sampleElems.length) {
      this.fire('bank', {
        sounds: this.sounds
      }, this, false);
    }
  }

  async initBuffers() {
    this.sampleElems = [...this.querySelectorAll('sample-blam')];
    for (const sampleElem of this.sampleElems) {
      await sampleElem.fileToBuffer();
    }
  }

  static {
    define(this);
  }
}

export { Bank }