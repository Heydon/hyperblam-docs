import { Handle } from './Handle.js';
import { random } from '../tools/random.js';

class Set extends Handle {
  constructor() {
    super();
    this.c = this.context();
    this.reverting = false;
  }

  onblamready() {
    super.onblamready();
    this.baseValue = this.toElems[0][this.prop];
  }

  handle(event, value) {
    let revert = this.revert && this.reverting;
    value = value !== undefined ? value : this.value;
    if (revert) {
      value = this.baseValue;
    }
    for (const to of this.toElems) {
      if (to[this.prop] === undefined) {
        return;
      }
      let chance = revert ? true : random.chance(this.chance);
      if (chance) {
        let time = event?.detail?.time || this.getTime();
        if (event?.detail?.x !== undefined && !!Number(value)) {
          value *= event.detail.x;
        } 

        let param = to?.params?.[this.prop];
        if (typeof param === 'object') {
          param.time = time;
          param.ramp = this.ramp;
        }

        switch (typeof to[this.prop]) {
          case 'boolean':
            to[this.prop] = !to[this.prop];
            break;
          case 'function':
            if (Array.isArray(value)) {
              to[this.prop](...value);
            } else {
              to[this.prop](value);
            }
            break;
          default: 
            to[this.prop] = value;
        }
        this.reverting = revert ? false : true;
        if (this.once) {
          this.unlisten();
        }
      } 
    }
  }

  get ramp() {
    let value = this.getAttribute('ramp');
    return value ? parseFloat(value) : null;
	}

	set ramp(value) {
		this.setAttribute('ramp', value);
  }

  get revert() {
		return this.hasAttribute('revert');
	}

	set revert(value) {
		this.toBoolean('revert', value);
	}

  static get observedAttributes () {
    return ['off'];
  }

  get once() {
		return this.hasAttribute('once');
	}

	set once(value) {
		this.toBoolean('once', value);
	}

  attributeChangedCallback(name, _, newVal) {
    if (name === 'off' && newVal) {
      this.reverting = true;
      this.handle();
    }
  }
}

export { Set }