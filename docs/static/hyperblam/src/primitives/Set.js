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
    this.baseValues = this.toElems.map(to => to[this.prop]);
  }

  choose(value) {
    if (value.includes('|')) {
      let values = value.split('|').map(v => this.stringNumBool(v));
      this.prevIndex = this.newIndex(this.prevIndex, values);
      return values[this.prevIndex];
    }
    if (value.includes('~')) {
      let values = value.split('~').map(v => parseFloat(v));
      return random.floatBetween(values[0], values[1]);
    }
    if (value.includes(' ')) {
      return value.split(' ').map(arg => this.stringNumBool(arg));
    }
    return this.stringNumBool(value);
  }

  triage(event, to, value) {
    if (this.prop.startsWith('--')) {
      to.style.setProperty(this.prop, value);
      return;
    }

    let time = event?.detail?.time || this.getTime();
    if (event?.detail?.x !== undefined && !!Number(value)) {
      value *= event.detail.x;
    }

    switch (typeof to[this.prop]) {
      case 'undefined':
        to.setAttribute(this.prop, value);
        break;
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
        let param = to?.params?.[this.prop];
        if (typeof param === 'object') {
          param.time = time;
          param.ramp = this.ramp;
        }          
        to[this.prop] = value;
    }  
  }

  handle(event, value) {
    let revert = this.revert && this.reverting;

    for (const [i, to] of this.toElems.entries()) {
      value = revert ? this.baseValues[i] : value !== undefined ? value : this.value;

      let chance = revert ? true : random.chance(this.chance);
      if (!chance) {
        return;
      }

      this.triage(event, to, value);
      
      this.reverting = revert ? false : true;

      if (this.once) {
        this.unlisten();
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

  get once() {
		return this.hasAttribute('once');
	}

	set once(value) {
		this.toBoolean('once', value);
	}

  get value() {
    let value = this.getAttribute('value');
    return value ? this.choose(value) : null;
	}

	set value(value) {
		this.setAttribute('value', value);
  }
}

export { Set }