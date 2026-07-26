import { Set } from '../primitives/Set.js';
import { random } from '../tools/random.js';

class One extends Set {
  handle(event, value) {
    if (!random.chance(this.chance)) {
      return;
    }

    if (this.robin) {
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

  get robin() {
		return this.hasAttribute('robin');
	}

	set robin(value) {
		this.toBoolean('robin', value);
	}
}

export { One }