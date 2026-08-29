import { ListenWatch } from './ListenWatch.js';
import { random } from '../tools/random.js';

class Set extends ListenWatch {
  constructor() {
    super();
    this.c = this.context();
    this.reverting = false;
    this.defaultMode = ['events'];
  }

  onblamready() {
    super.onblamready();
    this.baseValues = this.toElems.map(to => to[this.prop]);
  }

  choose(value) {
    if (value.includes('|')) {
      let values = value.split('|').map(v => this.unString(v));
      if (this.robin) {
        this.prevIndex = this.nextIndex(this.prevIndex, values);
      } else {
        this.prevIndex = this.newIndex(this.prevIndex, values);
      }
      return values[this.prevIndex];
    }
    if (value.includes('~')) {
      let values = value.split('~').map(v => parseFloat(v));
      return random.floatBetween(values[0], values[1]);
    }
    if (value.includes(' ')) {
      return value.split(' ').map(arg => this.unString(arg));
    }
    return this.unString(value);
  }

  triage(event, to, value) {
    if (this.prop.startsWith('--')) {
      to.style.setProperty(this.prop, value);
      return;
    }

    if (this.prop === 'class') {
      to.classList.remove(this.value);
      setTimeout(() => {
        to.classList.add(this.value);
      }, 1);
      return;
    }

    let time = event?.detail?.time || this.getTime();
    if (typeof event?.detail?.x === 'number') {
      value *= JSON.parse(event.detail.x);
    }

    switch (typeof to[this.prop]) {
      case 'undefined':
        to.setAttribute(this.prop, value);
        break;
      case 'boolean':
        to[this.prop] = this.value === null ? !to[this.prop] : value;
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

      this.fire('blam', {}, this);

      if (this.once) {
        this.unlisten();
      }
    }    
  }

  handleWatch(list, observer) {
    let event = {
      detail: {
        time: this.getTime()
      }
    }
    this.handle(event);
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

  get robin() {
		return this.hasAttribute('robin');
	}

	set robin(value) {
		this.toBoolean('robin', value);
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