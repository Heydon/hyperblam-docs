import { Base } from './Base.js';
import { random } from '../tools/random.js';

class Handle extends Base {
  constructor() {
    super();
    this.defaultFrom = () => [this.parentNode];
    this.defaultTo = () => [this.parentNode];
    this.defaultEvent = 'blam';
  }

  stringNumBool(string) {
    try {
      return JSON.parse(string);
    } catch {
      let notNum = !Number(string) && string !== '0';
      return notNum ? string : parseFloat(string);
    }
  }

  getNewIndex(prevIndex, arr) {
    if (arr.length < 2) {
      return preIndex;
    }
    let subset = arr.map((a, i) => i).filter(k => k !== prevIndex);
    return random.oneOf(subset);
  }

  choose(value) {
    if (value.includes('|')) {
      let values = value.split('|').map(v => this.stringNumBool(v));
      this.prevIndex = this.getNewIndex(this.prevIndex, values);
      if (this.id === 'lengthBlam') {
        console.log(this.prevIndex, values[this.prevIndex]);
      }
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

  setToFrom() {
    this.fromElems = this.from ? [...document.querySelectorAll(this.from)] : this.defaultFrom();
    this.toElems = this.to ? [...document.querySelectorAll(this.to)] : this.defaultTo();
  }

  onblamready() {
    this.setToFrom();
    this.listen();
  }

  handleEvent(event) {
    if (event.type === this.event && !this.bypass) {
      this.handle(event);
    } else {
      super.handleEvent(event);
    }
  }

  listen() {
    if (this.fromElems?.length && this.toElems?.length) {
      for (const from of this.fromElems) {
        from.addEventListener(this.event, this);
      }
    }
  }

  unlisten() {
    for (const from of this.fromElems) {
      from.removeEventListener(this.event, this);
    }    
  }

  get from() {
    return this.getAttribute('from');
	}

	set from(value) {
		this.setAttribute('from', value);
  }  

  get to() {
    return this.getAttribute('to');
	}

	set to(value) {
		this.setAttribute('to', value);
  }

  get value() {
    let value = this.getAttribute('value');
    return value ? this.choose(value) : null;
	}

	set value(value) {
		this.setAttribute('value', value);
  }

  get event() {
    return this.getAttribute('event') || this.defaultEvent;
	}

	set event(value) {
		this.setAttribute('event', value);
  }

  get prop() {
    return this.getAttribute('prop');
	}

	set prop(value) {
		this.setAttribute('prop', value);
  }

  get bypass() {
		return this.hasAttribute('bypass');
	}

	set bypass(value) {
		this.toBoolean('bypass', value);
	}

  get chance() {
    let value = this.getAttribute('chance');
    return value ? parseFloat(value) : 1;
	}

	set chance(value) {
		this.setAttribute('chance', value);
  }

  connectedCallback() {
    this.listen();
  }

  disconnectedCallback() {
    this.unlisten();
  }
}

export { Handle }