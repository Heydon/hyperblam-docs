import { Set } from '../primitives/Set.js';
import { random } from '../tools/random.js';

class One extends Set {
  handle(event, value) {
    if (!random.chance(this.chance)) {
      return;
    }

    if (this.fwd) {
      this.prevIndex = this.nextIndex(this.prevIndex, this.toElems);
    } else {
      this.prevIndex = this.newIndex(this.prevIndex, this.toElems);
    }
    let to = this.toElems[this.prevIndex];

    if (this.revert) {
      this.toElems.forEach((elem, i) => elem[this.prop] = this.baseValues[i]);
    }

    this.triage(event, to, value);

    if (this.once) {
      this.unlisten();
    }
  }

  get fwd() {
		return this.hasAttribute('fwd');
	}

	set fwd(value) {
		this.toBoolean('fwd', value);
	}
}

export { One }