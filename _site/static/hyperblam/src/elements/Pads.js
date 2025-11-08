import { Player } from '../helpers/Player.js';
import { define } from '../helpers/define.js';

class Pads extends Player {
  assignBuffer(cipher) {
    if (cipher === null) {
      return null;
    }
    if (cipher === undefined) {
      if (!this.robin) {
        this.prevSound = this.newItem(this.prevSound, this.sounds);
      } else {
        this.prevSound = this.cycle(this.prevSound, this.sounds);
      }
      return this.prevSound;
    } else if (isNaN(parseInt(cipher))) {
      return this.sounds.find(s => s.id === cipher);
    } else {
      return this.sounds[cipher - 1];
    }
  }

  static {
    define(this);
  }
}

export { Pads }