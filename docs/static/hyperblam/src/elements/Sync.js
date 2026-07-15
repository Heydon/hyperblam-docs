import { Watch } from '../primitives/Watch.js';

class Sync extends Watch {
  constructor() {
    super();
    this.defaultTo = () => [this];
  }

  handle(list, observer) {
    if (this.bypass) return;
    for (const mutation of list) {
      if (mutation.type === 'attributes') {
        let prop = mutation.attributeName;
        let value = node[prop]
        for (const to in this.toElems) {
          to.style.setProperty(`--${prop}`, value);
        }
      }
    }
  }
}

export { Sync }