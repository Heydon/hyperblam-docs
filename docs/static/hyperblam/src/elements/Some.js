import { Set } from '../primitives/Set.js';
import { random } from '../tools/random.js';

class Some extends Set {
  handle(event, value) {
    if (!random.chance(this.chance)) {
      return;
    }

    if (this.revert) {
      this.toElems.forEach((elem, i) => elem[this.prop] = this.baseValues[i]);
    }

    let chosen;

    if (this.max < 2) {
      if (this.robin) {
        this.prevIndex = this.nextIndex(this.prevIndex, this.toElems);
      } else {
        this.prevIndex = this.newIndex(this.prevIndex, this.toElems);
      }
      chosen = [this.toElems[this.prevIndex]];
    } else {
      let amount = random.integerBetween(this.min, this.max || this.toElems.length);
      chosen = random.some(this.toElems, amount);
    }

    for (const [i, to] of chosen.entries()) {
      this.triage(event, to, value);
    }

    if (this.once) {
      this.unlisten();
    }
  }

  get min() {
    let value = this.getAttribute('min');
    return value ? parseInt(value) : 1;
	}

	set min(value) {
		this.setAttribute('min', value);
  }

  get max() {
    let value = this.getAttribute('max');
    return value ? parseInt(value) : null;
	}

	set max(value) {
		this.setAttribute('max', value);
  }
}

export { Some }