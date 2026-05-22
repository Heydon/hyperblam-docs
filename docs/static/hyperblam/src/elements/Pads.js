import { Sampler } from '../primitives/Sampler.js';
import { define } from '../tools/define.js';

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
        this.sound = this.prevSound = this.newItem(this.prevSound, this.bankElem.sounds);
      } else {
        this.sound = this.prevSound = this.cycle(this.prevSound, this.bankElem.sounds);
      }      
    }
  }

  static {
    define(this);
  }
}

export { Pads }