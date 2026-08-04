import { Sampler } from '../primitives/Sampler.js';

class Pads extends Sampler {
  assignBuffer(cipher) {
    if (cipher === 0) {
      this.sample = null;
      return;
    }
    if (Number(cipher)) {
      this.sample = this.bankElem.samples[cipher - 1];
    } else {
      if (!this.robin) {
        this.prevIndex = this.newIndex(this.prevIndex, this.bankElem.samples);
      } else {
        this.prevIndex = this.nextIndex(this.prevIndex, this.bankElem.samples);
      } 
      this.sample = this.bankElem.samples[this.prevIndex];
    }
  }
}

export { Pads }