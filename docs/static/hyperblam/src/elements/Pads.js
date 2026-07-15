import { Sampler } from '../primitives/Sampler.js';

class Pads extends Sampler {
  assignBuffer(cipher) {
    if (cipher === 0) {
      this.sound = null;
      return;
    }
    if (Number(cipher)) {
      this.sound = this.bankElem.sounds[cipher - 1];
    } else {
      if (!this.robin) {
        this.prevIndex = this.newIndex(this.prevIndex, this.bankElem.sounds);
      } else {
        this.prevIndex = this.nextIndex(this.prevIndex, this.bankElem.sounds);
      } 
      this.sound = this.bankElem.sounds[this.prevIndex];
    }
  }
}

export { Pads }