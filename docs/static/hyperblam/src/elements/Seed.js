import { Handle } from '../primitives/Handle.js';
import { random } from '../tools/random.js';

class Seed extends Handle {
  constructor() {
    super();
    this.defaultTo = () => [this];
  }
  
  handle(event) {
    if (!random.chance(this.chance)) {
      return;
    }
    for (const to of this.toElems) {
      let name = this.name ? this.name : to.id ? to.id : this.id ? this.id : to.nodeName.toLowerCase();
      for (let seed = 0; seed < this.seeds; seed++) {
        let value = random.floatBetween(0, 1);
        to.style.setProperty(`--seed-${name}-${seed + 1}`, value);
      }
    }
  }

  get seeds() {
    let value = this.getAttribute('seeds');
    return value ? parseInt(value) : 1;
	}

	set seeds(value) {
		this.setAttribute('chance', value);
  }

  get name() {
    return this.getAttribute('name') || null;
	}

	set name(value) {
		this.setAttribute('name', value);
  }
}

export { Seed }